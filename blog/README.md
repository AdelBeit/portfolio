# Blog drafts

The blog isn't part of the site yet. Posts are drafted here and published to [dev.to](https://dev.to/adelbeit); the site's Blog cards (`BLOGPOSTS` in `src/data/portfolio.data.ts`) just link out to the dev.to versions.

## Layout

One folder per post, named after its slug. Anything the post needs (screenshots, diagrams, cover image) goes next to it:

```
blog/
  <post-slug>/
    index.md      # the post, with dev.to front matter
    assets/       # images used by the post (optional)
```

## Workflow

1. Draft in `blog/<post-slug>/index.md` with `published: false` in the front matter
2. Review the draft in a PR
3. Paste the content into dev.to and publish
4. Add the dev.to link to `BLOGPOSTS` in `src/data/portfolio.data.ts` if it should show on the site

These folders are not served by the site (Next.js only serves `pages/` and `public/`), so drafts stay private until you publish them.

## Writing style

Posts are hands-on tutorials written in first person, in a friendly, wry voice. [`pocketbase-quick-deploy`](pocketbase-quick-deploy/index.md) is the reference for everything below.

### Structure
- **Front matter** for dev.to: `title`, `published: false`, a `description` that starts with the opening words of the post (`Context   ...`), four or so `tags` (the last one is `tutorial`), and a `cover_image` line (a TODO comment until there is one).
- **Two centered openers:** `## <center>**Context**</center>` is the personal reason for the post and why I picked the main tool. `## <center>**Challenge**</center>` is what we're trying to achieve.
- **Orientation before step 1**, as `###` subsections under Challenge:
  - *What we're building:* the whole flow on one line, with arrows, in backticks
  - *The game plan:* a numbered list of the steps
  - *What you'll need:* one bullet per piece, with a bold generic category name, a short plain explanation, and "I'm using X" (so readers can swap in their own tool)
- **Closing the intro:** a folksy last bullet ("last but not least..."), a `######` BONUS aside, and a line explaining that anything in angle brackets is a placeholder.
- **One numbered step per section:** `## <center>**N. Title**</center>`. Steps build on each other, from local to remote, and each one is a small working checkpoint.
- **A new tool gets three beats before its commands:** what it does here (and what it gives us), what else could you use (bulleted, linked, including heavier options with an honest "more than you need"), and why I picked it (honest, and says when the alternative is the better answer).
- **After the commands:** a short explanation of anything non-obvious ("A few small details doing big work here:").
- **Checkpoints:** most steps end with "Here's what we've achieved so far:" and a `✅` list. The post closes with "Here's the whole journey:" and the same list, then a payoff line starting "And there you have it!".
- **Ending:** a few `<h6>` asides (a P.S., the comments line, the typos line), then a Resources list. The real docs link comes first, followed by joke-labelled links (Unpaid Intern, Background Music, Shameless Plug).

### Voice
- First person and conversational: "I personally **love**...", "Honestly, familiarity.", "we", "you". Contractions, short paragraphs, plain words.
- Opinionated but fair. Say what I use and why, and name the tool that would be a better fit for someone else.
- Explain jargon where it first appears, in a few words, in parentheses or a clause (VPS, CI/CD, `cross-env`). Spell out acronyms on first use.
- Jokes are light and sparse, about one every section or two. They work best as an absurd comparison ("a goldfish with a keyboard", "no YAML cathedral"), a self-aware aside ("Ask me how I know.", "(AI, ladies and gentlemen)", "or something like that"), or a tongue-in-cheek bonus (the song and the refund). Cut a joke if it's a cliché or it gets between the reader and the instruction.
- Practical honesty: say what's left out ("What I left out, because it's beyond a one hour setup...") instead of overselling.

### Highlighting and formatting
- `<mark>` is rare, one or two per section, for the key idea or the phrase to remember ("reverse proxy", "not directly from the internet", "deploy", "remote environment").
- **Bold** is for emphasis words ("**definitely**", "**not**"), the category label in lists, and the question lead-ins ("**What else could you use?**"). *Italics* are for a single stressed word ("*need*", "*inside*").
- Backticks for commands, files, env vars, ports and tool names inline.
- Emoji are sparse and decorative: `✨` around one phrase in the intro, one `🐳` after the Docker intro, and `✅` on checklist items only. Never in headings.
- Headings: centered bold `##` for sections, plain `###` for subsections, `######` for the BONUS aside.
- Link external tools once, on first mention.

### Code and content rules
- Every code block starts with a file-path comment (`# pocketbase/Dockerfile`) and carries short comments that explain the why.
- Anything personal or client-specific is a `<placeholder>`: servers, domains, usernames, key names. No real IPs, domains or credentials. Example emails use `@example.com` and sample passwords are obviously fake.
- Commands are shown for the common case first, with the Windows or PowerShell variant noted beside them.
- Drafts are written clean, with no deliberate typos. The "All typos are on purpose" closer is a joke and stays.
