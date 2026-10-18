---
title: How to publish a PocketBase instance in a new env, local or remote
published: false
description: Context   I'm a frontend dev who keeps needing a backend for client sites. Now of course you might say...
tags: pocketbase, docker, tutorial, devops
# cover_image: TODO pick a cover image (and credit it at the bottom)
---

## <center>**Context**</center>
I'm a frontend developer by trade, which means every few months a client asks for "just a little login and a place to store form submissions" and I have to go find a backend. Now of course you might say, why not Firebase or Supabase. To that I say, I like owning my data, and I like my bill being the same number every month.

Enter PocketBase. It's ✨one binary✨ with a database (SQLite), auth, file storage, a REST API and an admin dashboard baked in. No install wizard, no 14 microservices, no YAML cathedral. Seriously everyone <mark>**needs** to try PocketBase</mark> at least once, you will feel like you've been cheating on your weekends.

## <center>**Challenge**</center>
I've now set this up for a handful of projects, and every single time I had to rediscover the steps like a goldfish with a keyboard. So this is the cheat sheet. The goal: get a PocketBase instance running in a brand new environment, <mark>local **and** remote</mark>, with the same repeatable steps, no clicking around dashboards, and no dev-only junk leaking into production.

This is also applicable to any other small backend you can put in a container. PocketBase just happens to make it painless.

First step is running it locally. Here's how:

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

If you're on Windows that's `pocketbase.exe`, and I use `cross-env` so the `PB_ENV=dev` part works in any shell.

The admin dashboard lives at `http://127.0.0.1:8090/_/`. Go say hi.

`PB_ENV` isn't a PocketBase thing by the way, it's just an environment variable I made up, and it's about to be very useful.

Locally I want a user to log in with so I'm not creating one by hand every time I wipe my database. But I **definitely** don't want that user existing in production. So let's make a migration that only runs when `PB_ENV=dev`.

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

Now the local side is done, but "works on my machine" is not a deployment strategy. Time to put it in a box 🐳

Here's the Dockerfile. Notice we only copy in `pb_hooks` and `pb_migrations`, the code, **not** the data. Your actual database lives in a volume, we'll get to that.

```dockerfile
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

And the compose file that will live on the server:

```yml
services:
  pocketbase:
    image: ghcr.io/<github-user>/<dirname>:${IMAGE_TAG:-latest}
    restart: unless-stopped
    ports:
      - "127.0.0.1:<port>:8090"
    environment:
      - PB_ENV=production
    volumes:
      - pb_data:/pb/pb_data

volumes:
  pb_data:
```

Three small details doing big work here:
- `PB_ENV=production` so our dev-only migration stays asleep.
- `127.0.0.1:<port>:8090` instead of `0.0.0.0`, so the container is only reachable through nginx and <mark>not directly from the internet</mark>.
- the `pb_data` volume, so redeploying the container doesn't deploy your database into the void.

So naturally the next question is, where does this box go? For me it's a DigitalOcean droplet, but any Linux server with Docker and nginx will do. If you already have another PocketBase running on it, pick a different `<port>`. Ask me how I know that 8090 was taken.

Let's prep the server, **on the droplet**:

```bash
# a dedicated user for deploys, don't deploy as root
sudo adduser <username>
sudo mkdir -p /opt/<dirname>
sudo chown -R <username>:<username> /opt/<dirname>
# the user needs docker access
sudo usermod -aG docker <username>
# somewhere for the deploy key to live
sudo -u <username> mkdir -p -m 700 /home/<username>/.ssh
```

And **not on the droplet**, on your own machine:

```bash
# make a dedicated deploy key
ssh-keygen -t ed25519 -C <username> -f ~/.ssh/<keyname> -N "<passphrase>"

# log in as root once and copy the public key over
ssh root@<droplet-ip> "cat >> /home/<username>/.ssh/authorized_keys" < ~/.ssh/<keyname>.pub

# or, if you want to prepend restrictions to the key
sed 's/^/no-port-forwarding,no-agent-forwarding /' ~/.ssh/<keyname>.pub | ssh root@<droplet-ip> "cat >> /home/<username>/.ssh/authorized_keys"

# make sure the new user can actually log in
ssh <username>@<droplet-ip> -i ~/.ssh/<keyname>
```

A dedicated deploy key is cleaner than reusing your personal one. If it ever leaks, you revoke one key and your whole life isn't on fire.

Now we need GitHub to be able to use that key. In your repo settings, add these as **Actions secrets**:
- `DROPLET_HOST` = the droplet's IP
- `DROPLET_USER` = `<username>`
- `DROPLET_SSH_KEY` = the **private** key that matches the authorized key on the droplet
- `DROPLET_SSH_PASSPHRASE` = the passphrase, only if you set one

Here's the workflow. It builds the image, pushes it to GitHub's container registry (GHCR), copies the compose file over, pulls and restarts on the droplet, and then waits for PocketBase to say it's healthy.

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

      - name: Copy compose file to droplet
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.DROPLET_HOST }}
          username: ${{ secrets.DROPLET_USER }}
          key: ${{ secrets.DROPLET_SSH_KEY }}
          source: "pocketbase/docker-compose.yml"
          target: "/opt/<dirname>/"
          strip_components: 1

      - name: Deploy to droplet
        uses: appleboy/ssh-action@v1.0.3
        env:
          GHCR_ACTOR: ${{ github.actor }}
          GHCR_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          IMAGE_TAG: ${{ github.sha }}
        with:
          host: ${{ secrets.DROPLET_HOST }}
          username: ${{ secrets.DROPLET_USER }}
          key: ${{ secrets.DROPLET_SSH_KEY }}
          envs: GHCR_ACTOR,GHCR_TOKEN,IMAGE_TAG
          script: |
            echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_ACTOR" --password-stdin
            cd /opt/<dirname>
            docker compose pull pocketbase
            docker compose up -d

      - name: Health check
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.DROPLET_HOST }}
          username: ${{ secrets.DROPLET_USER }}
          key: ${{ secrets.DROPLET_SSH_KEY }}
          script: |
            for i in $(seq 1 30); do
              if curl -sf http://127.0.0.1:<port>/api/health > /dev/null 2>&1; then
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

Almost there. The container is only listening on localhost, so let's give it a front door. First, a DNS **A record** pointing your subdomain (`api.yourdomain.com`, or anything you like) at the droplet's IP.

Then nginx. This config is the one I copy around:

```conf
# throttle public write endpoints to curb spam (see below)
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
        proxy_pass http://127.0.0.1:<port>;
    }

    location / {
        proxy_pass http://127.0.0.1:<port>;
    }
}
```

That `limit_req` block is for any collection where you let strangers create records, like a contact form. If the rule is public, the internet will find it. Rate limit it.

Copy it over, enable it, and get a free TLS cert (after DNS has propagated, patience, young padawan):

```bash
scp nginx-<website-url>.conf <username>@<droplet-ip>:/etc/nginx/sites-available/<website-url>
ssh <username>@<droplet-ip> "ln -s /etc/nginx/sites-available/<website-url> /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx"
ssh <username>@<droplet-ip> "certbot --nginx -d <website-url>"
```

Certbot rewrites the site file in place and adds the 443 block plus an 80 → 443 redirect. It's the most satisfying part of the whole process, don't skip it.

> Note: writing to `/etc/nginx` and running `certbot` needs root, so use whichever account on the server has the right sudo setup, or run those through your root login. Your deploy user shouldn't need that power, and I'd keep it that way.

Now push to `main` and watch the Actions tab do its thing. Once the health check goes green there's one last thing, **your production superuser**. Remember, the dev account was never created here (thanks `PB_ENV`), so there's nobody to log in yet:

```bash
ssh <username>@<droplet-ip> -i ~/.ssh/<keyname>
cd /opt/<dirname>
# confirm the container is running
docker compose ps
# create the real superuser with a real password
docker compose exec pocketbase /pb/pocketbase superuser upsert <superuser-email> <strong-password>
```

Then point your frontend at it. For me that's an environment variable in Vercel:

```bash
NEXT_PUBLIC_POCKETBASE_URL=https://<website-url>
```

Redeploy the frontend, and that's it.

And for the days when something is off, here's my "turn it off and on again" toolkit:

```bash
ssh <username>@<droplet-ip> -i ~/.ssh/<keyname>
cd /opt/<dirname>
docker compose ps                          # status
docker compose logs -f                     # tail the logs
docker compose up -d                       # start/restart (does NOT pull a new image)
docker compose pull && docker compose up -d   # get the latest image, then restart
docker compose exec pocketbase sh          # shell into the running container
```

Here's what we've achieved:
- ✅ PocketBase running locally with a dev-only user
- ✅ a container that ships your code and keeps your data in a volume
- ✅ a deploy key and a pipeline that deploys on every push to `main`
- ✅ nginx, TLS and rate limiting in front of it
- ✅ a real superuser and a frontend pointing at it

And there you have it! This was how to <mark>publish</mark> a PocketBase instance in a <mark>new environment</mark>, local or remote, without losing your mind.

<h6>P.S. if you only need this for a hobby project, you could skip the pipeline and just `scp` the binary and run it under systemd. But where's the fun in that, and also you'll be doing it by hand every single time.</h6>

<h6>If you have any comments, questions, or concerns, please keep them to yourself.</h6>

<h6>All typos are on purpose.</h6>

## Resources
- [PocketBase Docs](https://pocketbase.io/docs/)
- [Unpaid Intern](https://claude.ai/)
- [Emotional Support](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhzdY2LIXuzsiEvKVd-jxZYF17s4WwtvIIdA&usqp=CAU)
- [Shameless Plug](https://adelbeit.com/)
