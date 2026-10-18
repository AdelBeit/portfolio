---
title: How to deploy your own PocketBase backend to a remote env in less than an hour
published: false
description: Context   Every once in a while I have to stand up a new backend/DB. I used to just use Supabase, but I don't like...
tags: pocketbase, docker, nginx, tutorial
# cover_image: TODO pick a cover image (and credit it at the bottom)
---

## <center>**Context**</center>
Every once in a while I have to stand up a new backend/DB. I used to just use Supabase, but I don't like the idea of not owning my data, and I like my bill being the same number every month.

I personally **love** Pocketbase for this. It's ✨one binary✨ with a database (SQLite), auth, file storage, a REST API and an admin dashboard baked in. No install wizard, no 14 microservices, no YAML cathedral. It's what I reach for whenever a project needs a small, self-contained backend. If you want to compare other options, here are some [other alternatives](https://alternativeto.net/software/pocketbase/) you could check out.

## <center>**Challenge**</center>
I've now set this up for a handful of projects, and every single time I had to rediscover the steps like a goldfish with a keyboard. So this is the cheat sheet.

### What we're building
By the end, requests will flow like this:

`browser` → Reverse proxy tool (`nginx`) (HTTPS, on a server) → `Docker container` (PocketBase) → `volume` (your database)

### The game plan (Agile style)
1. Run PocketBase in a local dev environment
2. Put it behind nginx
3. Containerize it and keep it behind the local nginx
4. Put nginx and the container on a VPS (remote env), with a domain and HTTPS
5. Introduce a container registry for versioning our image (in our case GHCR)
6. Automate the deploys with GitHub Actions or another CI/CD tool

### What you'll need
Here's the stack I'm using, and what each piece is called in case you want to swap in your own:
- **A backend/database:** I'll be using PocketBase, an open source backend in a single executable with SQLite built in
- **A container platform:** I'm using Docker (and Docker Compose) because it's what I like to use the most
- **A reverse proxy:** it routes incoming requests to the right app, handles HTTPS, and enforces limits (and it can load balance too, if you ever run more than one copy of your app). I'll be using nginx
- **Version control:** Git, hosted on GitHub, because I like GitHub
- **A container registry:** a place to store our built Docker images. I use GHCR (GitHub Container Registry)
- **A CI/CD tool:** continuous integration/continuous delivery, the thing that builds and deploys for you on every push. I use GitHub Actions
- **A remote environment:** a VPS (virtual private server) to run it all on. I love DigitalOcean droplets
- **A domain/subdomain** for making the DB accessible on the internet
- *Optional* **A health check monitor:** a service that keeps pinging PocketBase's health endpoint and alerts you (or triggers a rollback) when it stops responding

and last but not least, a handy dandy terminal with basic knowledge of SSH.

###### BONUS; a [song](https://youtu.be/WEirepuG604) to lock in and time yourself, if you don't finish this tutorial within an hour I'll personally refund you.


<mark>Everything in angle brackets</mark> like `<username>` or `<website-url>` is a placeholder for your own value.

## <center>**1. PocketBase, locally**</center>
Nothing fancy yet. We want PocketBase running on your machine so you know what we're about to ship. Here's how:

```bash
# grab the binary for your OS/arch from https://github.com/pocketbase/pocketbase/releases
# (put it in a `pocketbase/` folder in your project)
cd pocketbase

# run the migrations, then start the server
PB_ENV=dev ./pocketbase migrate up
PB_ENV=dev ./pocketbase serve

# create yourself a superuser
./pocketbase superuser upsert dev-admin@example.com change-me-locally
```

If you're on Windows that's `pocketbase.exe`.

The admin dashboard lives at `http://127.0.0.1:8090/_/`.

You don't actually *need* `PB_ENV` (it isn't a PocketBase thing, just an environment variable I made up) or `cross-env` (a tiny tool that makes `PB_ENV=dev` work in any shell, Windows included), but they're useful for one very specific thing. Locally I want a user to log in with so I'm not creating one by hand every time I wipe my database. But I **definitely** don't want that user existing in production. So let's make a migration that only runs when `PB_ENV=dev`.

```bash
./pocketbase migrate create dev_user
```

```javascript
// pb_migrations/<timestamp>_dev_user.js
/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // bail out unless we are in dev
  if ($os.getenv("PB_ENV") !== "dev") return;

  let existing;
  const DEV_EMAIL = "dev@example.com";
  const DEV_PASS = "change-me-locally";
  try {
    existing = app.findFirstRecordByData("users", "email", DEV_EMAIL);
  } catch (e) {
    existing = null;
  }
  if (existing) return;

  const record = new Record(app.findCollectionByNameOrId("users"));
  record.set("email", DEV_EMAIL);
  record.set("password", DEV_PASS);
  record.set("verified", true);
  app.save(record);
}, (app) => {
  // same guard on the way down
  if ($os.getenv("PB_ENV") !== "dev") return;

  let existing;
  try {
    existing = app.findFirstRecordByData("users", "email", "dev@example.com");
  } catch (e) {
    existing = null;
  }
  if (existing) app.delete(existing);
})
```

That `PB_ENV` check is the whole trick. In production the migration runs, shrugs, and does nothing.

Here's what we've achieved so far:
- ✅ PocketBase running locally
- ✅ a superuser and a dev-only user
- ✅ migrations that know which environment they're in

## <center>**2. Put it behind nginx**</center>
Right now you're talking to PocketBase directly on port 8090. That's fine on your laptop, but it's not what you want facing the internet. Before we touch the server, let's get used to the setup we'll use there.

**What is nginx doing here?** It's a <mark>reverse proxy</mark>. It sits in front of PocketBase, accepts the incoming requests, and forwards them to it. That gives us a few things:
- **HTTPS.** nginx handles the TLS certificate so PocketBase doesn't have to
- **One front door for many apps.** Several apps can share one server and one port 443, routed by domain name
- **Guard rails.** Rate limits and a max upload size, before a request ever reaches PocketBase
- **Privacy.** The app itself only listens on localhost and can't be reached directly from the internet

**What else could you use?**
- [Caddy](https://caddyserver.com/) is simpler, and gets and renews HTTPS certificates automatically
- [Traefik](https://traefik.io/) is built for containers and configures itself from Docker labels
- PocketBase can also serve HTTPS by itself if you hand it a domain, which is the least moving parts if it's the only thing on the box

**Why nginx then?** Honestly, familiarity. It comes with some extras out of the box like rate limiting and upload limits written down in one config file I can read. If you're starting from scratch with a single app, Caddy is a perfectly good answer as well.

Install nginx (`brew install nginx`, `sudo apt install nginx`, or the zip from [nginx.org](https://nginx.org/en/download.html) on Windows) and add this server block to your config. Where it goes depends on your OS: `conf.d/`, `sites-enabled/`, or inside `http {}` in `nginx.conf`.

```conf
# local dev: nginx listens on 8080 and forwards to PocketBase on 8090
server {
    listen 8080;
    server_name localhost;

    # max upload size, i.e. maxSelect:20 * maxSize:10MB per request
    client_max_body_size 250m;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    location / {
        proxy_pass http://127.0.0.1:8090;
    }
}
```

```bash
nginx -t          # check the config
nginx -s reload   # (or start nginx if it isn't running yet)
```

Now `http://localhost:8080/_/` shows the same dashboard, but through nginx. If you plan to use PocketBase's realtime subscriptions, double check [PocketBase's docs](https://pocketbase.io/docs/) for the extra nginx proxy settings they recommend.

Later we'll add a rate limit for any collection that strangers are allowed to write to. For now, one thing to take away: nginx doesn't care what's behind it, as long as something answers on the port you give it. Which brings us to the next step.

## <center>**3. Put PocketBase in Docker Compose, behind the same nginx**</center>
Now we put PocketBase in a box, a container, 🐳

**What does Docker give us?** It's a container platform: it packages an app and everything it needs into an image, and runs that image as an isolated container. That makes it easy to set up the same environment across platforms/machines with a single command. To update you just pull the latest image, rollback is the same with an older image, and your data stays safe in a volume.

**What else could you use?**
- Run the binary directly under `systemd`. Fewer layers, totally valid for a hobby project, but you're updating and wiring it up by hand every time
- [Podman](https://podman.io/), a Docker-compatible alternative that runs without a background daemon
- [Kubernetes](https://kubernetes.io/) (or a lighter orchestrator like Docker Swarm or Nomad). They run and scale containers across many servers, which is way more than one small PocketBase on one box needs, but good to know they exist for when you outgrow this
- A managed PocketBase host, or a PaaS with persistent disks, if you'd rather not run a server at all

Here's the Dockerfile. Notice we only copy in `pb_hooks` and `pb_migrations`, the code, **not** the data. Your actual database lives in a volume.

```dockerfile
# pocketbase/Dockerfile
FROM alpine:3.20

# pin whatever version you tested against, bump it on purpose
ARG PB_VERSION=0.40.2

RUN apk add --no-cache unzip ca-certificates curl

WORKDIR /pb

RUN curl -L -o pb.zip https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
    && unzip pb.zip -d /pb/ \
    && rm pb.zip \
    && chmod +x /pb/pocketbase

COPY pb_hooks /pb/pb_hooks
COPY pb_migrations /pb/pb_migrations

EXPOSE 8090

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]
```

Heads up, those two `COPY` lines will fail the build if the folders don't exist. That's why running `migrate up` locally first matters, it makes sure `pb_migrations/` is there so the image can actually be built.

And the compose file:

```yml
# pocketbase/docker-compose.yml
services:
  pocketbase:
    build: .
    restart: unless-stopped
    ports:
      - "127.0.0.1:8091:8090"
    environment:
      - PB_ENV=${PB_ENV:-production}
    volumes:
      - pb_data:/pb/pb_data

volumes:
  pb_data:
```

A few small details doing big work here:
- `127.0.0.1:8091:8090` is `host-ip:host-port:container-port`. Notice I mapped 8091 to 8090 on purpose, to show the difference. 8090 is the port PocketBase listens on *inside* the container. 8091 is the port Docker opens on the machine, and it's where nginx forwards requests to (that's the `proxy_pass`). The public internet never calls 8091, it talks to nginx. I picked 8091 because on my server 8090 was already taken by another PocketBase. Ask me how I know. Use any free port
- That `127.0.0.1` (instead of `0.0.0.0`) means the container is only reachable through nginx and <mark>not directly from the internet</mark>
- `PB_ENV=${PB_ENV:-production}` defaults to production, so you have to ask for dev on purpose. Our dev-only migration stays asleep unless you say otherwise
- the `pb_data` volume, so recreating the container doesn't delete your database

You can stop the binary from step 1 now (Ctrl+C). Start the container in dev mode, then point nginx at the new port by changing `proxy_pass` to `http://127.0.0.1:8091` and reloading:

```bash
cd pocketbase
PB_ENV=dev docker compose up -d --build
# PowerShell: $env:PB_ENV="dev"; docker compose up -d --build
nginx -s reload
```

`http://localhost:8080/_/` works again, same nginx, different thing behind it. The container starts with an empty database, so run the superuser command again:

```bash
docker compose exec pocketbase /pb/pocketbase superuser upsert dev-admin@example.com change-me-locally
```

Here's what we've achieved so far:
- ✅ PocketBase running locally, directly and in a container
- ✅ nginx in front of it

## <center>**4. Put it on a VPS**</center>
Same two pieces, nginx and the compose file, but this time on a server on the internet.

**Why a VPS?** I get a real Linux box with full control, a flat monthly price, and a place for several small apps. PocketBase wants a persistent disk, and a VPS has one.

Any provider works. A few to look at:
- [DigitalOcean](https://www.digitalocean.com/) (Droplets)
- [AWS](https://aws.amazon.com/) (Lightsail or EC2)
- [Microsoft Azure](https://azure.microsoft.com/) (Virtual Machines)
- [Google Cloud](https://cloud.google.com/) (Compute Engine)
- [Hetzner](https://www.hetzner.com/cloud) (Cloud servers)

Here's the order, and the order matters:

### DNS first
Add an **A record** pointing your subdomain (`api.yourdomain.com`, or anything you like) at the server's IP. DNS takes a while to propagate and we need it ready for HTTPS, so do it now and do the rest while it settles.

### Prep the server
Log in as root and install what we need (Debian/Ubuntu shown, Docker via the [install guide](https://docs.docker.com/engine/install/)):

```bash
apt update && apt install -y nginx certbot python3-certbot-nginx
```

Then create a dedicated user for deploys, don't deploy as root:

```bash
sudo adduser <username>
sudo mkdir -p /opt/<dirname>
sudo chown -R <username>:<username> /opt/<dirname>
# the user needs docker access
sudo usermod -aG docker <username>
# somewhere for the deploy key to live
sudo -u <username> mkdir -p -m 700 /home/<username>/.ssh
```

And **not on the server**, on your own machine, make a deploy key and give the server the public half:

```bash
# make a dedicated deploy key
ssh-keygen -t ed25519 -C <username> -f ~/.ssh/<keyname> -N "<passphrase>"

# log in as root once and copy the public key over
ssh root@<vps-ip> "cat >> /home/<username>/.ssh/authorized_keys" < ~/.ssh/<keyname>.pub

# or, if you want to prepend restrictions to the key
sed 's/^/no-port-forwarding,no-agent-forwarding /' ~/.ssh/<keyname>.pub | ssh root@<vps-ip> "cat >> /home/<username>/.ssh/authorized_keys"

# make sure the new user can actually log in
ssh <username>@<vps-ip> -i ~/.ssh/<keyname>
```

A dedicated deploy key is cleaner than reusing your personal one, if it leaks you revoke that one key and nothing else.

### Get the files there and start it
For now we'll build the image right on the server. Run this from your `pocketbase/` folder (we're sending the code, not your local data):

```bash
scp -r Dockerfile docker-compose.yml pb_hooks pb_migrations <username>@<vps-ip>:/opt/<dirname>/
ssh <username>@<vps-ip> -i ~/.ssh/<keyname> "cd /opt/<dirname> && docker compose up -d --build"
```

No `PB_ENV` this time, so it defaults to `production` and the dev user is never created.

### The server's nginx
Same idea as before, with three upgrades: your real domain, the production port, and a rate limit.

```conf
# throttle public write endpoints to curb spam
limit_req_zone $binary_remote_addr zone=<zone-name>:10m rate=5r/m;

server {
    listen 80;
    server_name <website-url>;

    # max upload size, i.e. maxSelect:20 * maxSize:10MB per request
    client_max_body_size 250m;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # any collection with a public (unauthenticated) createRule
    location = /api/collections/<collection>/records {
        limit_req zone=<zone-name> burst=3 nodelay;
        proxy_pass http://127.0.0.1:8091;
    }

    location / {
        proxy_pass http://127.0.0.1:8091;
    }
}
```

That `limit_req` block is for any collection where you let strangers create records, like a contact form. If the rule is public, the internet will find it. Rate limit it.

Copy it over, enable it, and issue a free HTTPS certificate. Writing to `/etc/nginx` and running `certbot` needs root, so use your root login here. Your deploy user shouldn't need that power, and I'd keep it that way.

```bash
scp nginx-<website-url>.conf root@<vps-ip>:/etc/nginx/sites-available/<website-url>
ssh root@<vps-ip> "ln -s /etc/nginx/sites-available/<website-url> /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx"
# once DNS has propagated
ssh root@<vps-ip> "certbot --nginx -d <website-url>"
```

Certbot rewrites the site file in place and adds the 443 block plus an 80 → 443 redirect.

### Your production superuser
The dev account was never created here (thanks `PB_ENV`), so nobody can log in yet:

```bash
ssh <username>@<vps-ip> -i ~/.ssh/<keyname>
cd /opt/<dirname>
# confirm the container is running
docker compose ps
# create the real superuser with a real password
docker compose exec pocketbase /pb/pocketbase superuser upsert <superuser-email> <strong-password>
```

Visit `https://<website-url>/_/` and log in.

Here's what we've achieved so far:
- ✅ PocketBase running on a server, in a container, only reachable through nginx
- ✅ a deploy user with its own key
- ✅ a real superuser and no dev account in production

## <center>**5. A container registry**</center>
Right now the server builds the image itself. It works, but every deploy means sending files over and building on a small machine, and there's no clean record of which version is running.

**What's a container registry?** It's a place to store built Docker images, with tags. Instead of building on the server, we build once somewhere else, push the image to the registry with a version tag, and the server just **pulls** that exact image. That gets us:
- **Faster, lighter deploys.** The server only downloads, it never builds
- **Versioning.** We tag each image with the git commit that produced it, so you always know what's running and can roll back by pulling an older tag
- **The same image everywhere.** What you tested is what you deploy

**What else could you use?**
- **Docker Hub**, the default and the most common, but anonymous pulls are rate limited
- A cloud provider's own registry (AWS ECR, DigitalOcean Container Registry, and so on), good if you already live there, but another service to set up and pay attention to
- Running your own registry, which is one more server to look after

**Why GHCR?** [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) (`ghcr.io`) lives right next to the code. Our deploy will run on GitHub Actions anyway, and Actions can log in to GHCR with the token it already has, no extra account and no extra secret to manage.

Your compose file changes in one place: swap `build: .` for an `image:` line. This is the file that lives on the server from now on:

```yml
# pocketbase/docker-compose.yml
services:
  pocketbase:
    image: ghcr.io/<github-user>/<dirname>:${IMAGE_TAG:-latest}
    restart: unless-stopped
    ports:
      - "127.0.0.1:8091:8090"
    environment:
      - PB_ENV=production
    volumes:
      - pb_data:/pb/pb_data

volumes:
  pb_data:
```

Two notes. Image names on GHCR have to be lowercase. And `${IMAGE_TAG:-latest}` means "use this tag, or `latest` if I didn't give one", which is how a deploy picks a specific version.

## <center>**6. Automate it with GitHub Actions**</center>
You could build and push by hand, but we've built all this so we can just push to `main` and let the computer handle it automatically (AI, ladies and gentlemen).

First, give GitHub the key it needs. In your repo settings, add these as **Actions secrets**:
- `VPS_HOST` = the VPS's IP
- `VPS_USER` = `<username>`
- `VPS_SSH_KEY` = the **private** key that matches the authorized key on the VPS
- `VPS_SSH_PASSPHRASE` = the passphrase, only if you set one

Then the workflow. It builds the image, pushes it to GHCR, copies the compose file to the server, pulls and restarts, and waits for PocketBase to say it's healthy.

```yml
# .github/workflows/deploy-pocketbase.yml
name: Deploy PocketBase

on:
  push:
    branches: [main]
    paths:
      - "pocketbase/**"
      - ".github/workflows/deploy-pocketbase.yml"
  workflow_dispatch: {}

permissions:
  contents: read
  packages: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Login to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push image
        uses: docker/build-push-action@v6
        with:
          context: ./pocketbase
          file: ./pocketbase/Dockerfile
          push: true
          tags: |
            ghcr.io/<github-user>/<dirname>:${{ github.sha }}
            ghcr.io/<github-user>/<dirname>:latest

      - name: Copy compose file to VPS
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          source: "pocketbase/docker-compose.yml"
          target: "/opt/<dirname>/"
          strip_components: 1

      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1.0.3
        env:
          GHCR_ACTOR: ${{ github.actor }}
          GHCR_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          IMAGE_TAG: ${{ github.sha }}
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          envs: GHCR_ACTOR,GHCR_TOKEN,IMAGE_TAG
          script: |
            echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_ACTOR" --password-stdin
            cd /opt/<dirname>
            docker compose pull pocketbase
            docker compose up -d

      - name: Health check
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            for i in $(seq 1 30); do
              if curl -sf http://127.0.0.1:8091/api/health > /dev/null 2>&1; then
                echo "Health check passed"
                exit 0
              fi
              echo "Attempt $i/30 - waiting..."
              sleep 2
            done
            echo "Health check failed after 30 attempts"
            exit 1
```

Because of `workflow_dispatch`, you can also trigger it by hand from the Actions tab, no merging required. Very handy for the "I changed nothing, please just try again" moments.

Push to `main` and watch the Actions tab do its thing. Every deploy is now tagged with its commit, and that's your rollback button.

## <center>**Finishing touches**</center>
Point your frontend at it. For me that's an environment variable in Vercel:

```bash
NEXT_PUBLIC_POCKETBASE_URL=https://<website-url>
```

Redeploy the frontend, and that's it.

For the days when something is off, here's my "turn it off and on again" toolkit:

```bash
ssh <username>@<vps-ip> -i ~/.ssh/<keyname>
cd /opt/<dirname>
docker compose ps                          # status
docker compose logs -f                     # tail the logs
docker compose up -d                       # start/restart (does NOT pull a new image)
docker compose pull && docker compose up -d   # get the latest image, then restart
docker compose exec pocketbase sh          # shell into the running container
```

What I left out, because it's beyond a one hour setup but you'll want it soon: **backups** of the `pb_data` volume, a **firewall** that only allows SSH, HTTP and HTTPS, and some kind of **uptime monitoring**.

Here's the whole journey:
- ✅ PocketBase running locally with a dev-only user
- ✅ nginx in front of it, and why
- ✅ a container that ships your code and keeps your data in a volume
- ✅ a VPS with a domain, HTTPS and rate limiting
- ✅ a registry so every deploy has a version
- ✅ a pipeline that deploys on every push to `main`

And there you have it! This was how to <mark>deploy</mark> your own PocketBase backend to a <mark>remote environment</mark>, in less than an hour (or something like that).

<h6>P.S. if you only need this for a hobby project, you could skip the pipeline and the registry and stop at step 4. It works fine, you'll just be doing the deploys by hand.</h6>

<h6>If you have any comments, questions, or concerns, please keep them to yourself.</h6>

<h6>All typos are on purpose.</h6>

## Resources
- [PocketBase Docs](https://pocketbase.io/docs/)
- [Unpaid Intern](https://claude.ai/)
- [Background Music](https://youtu.be/D4AsrfxgWGQ)
- [Shameless Plug](https://adelbeit.com/)
