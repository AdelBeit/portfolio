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

Posts are hands-on tutorials in first person, in a friendly, wry voice, aimed at developers who are comfortable but haven't used the tool yet. Two posts are the reference, and everything below holds for both:
- [How to persist client-side preferences on the client in Svelte (w/o DB)](https://dev.to/adelbeit/how-to-persist-user-preferences-in-svelte-wo-db-51nf), published on dev.to. A short problem-and-fix post
- [`pocketbase-quick-deploy`](pocketbase-quick-deploy/index.md), a draft. A longer, multi-tool setup guide

### The skeleton every post shares
- **Front matter** for dev.to: `title` ("How to ..."), `published: false` until it goes live, a `description` that starts with the opening words of the post (`Context   ...`), four or so `tags` (always including `tutorial`), and a `cover_image`.
- **Two centered openers:** `## <center>**Context**</center>` is the personal reason for the post: what I was building, why I picked the main tool, and any credentials worth a wink ("I'm a React developer by trade"). `## <center>**Challenge**</center>` is the problem or goal, and optionally where else it applies.
- **A decision is a list:** when there is a choice to make, lay the options out as a list, pick one, and say why. The same pattern covers "2 ways to solve this" and "What else could you use?".
- **Concepts are introduced right before they're used,** with a one-line plain definition and a link to the official docs (a "brief review" of the store, `load`, a reverse proxy), never as a glossary up front. Jargon gets a parenthetical the first time it appears.
- **Checkpoints:** "Here's what we've achieved so far:" followed by a `✅` list, then the next problem or step. The post closes with a payoff line starting "And there you have it!" that restates the goal with one or two `<mark>`s.
- **Ending:** `<h6>` asides (a P.S. and the closers: "If you have any comments, questions, or concerns, please keep them to yourself." and "All typos are on purpose."), then `## Resources`. The real docs link comes first, then joke-labelled links (Unpaid Intern for the AI assistant, Emotional Support, Background Music, Shameless Plug for adelbeit.com), then the cover image credit if there is a cover.

### Two shapes, same voice
Pick the shape that fits the post:

| | Problem-and-fix post | Multi-tool setup guide |
| --- | --- | --- |
| Body | Unnumbered narrative sections that build up: simplest version first, hit a problem ("But what's this??"), introduce the next piece ("Enter, `+layout.svelte`.") | Orientation first, then numbered sections |
| Orientation | Not needed | Under Challenge, as `###`: *What we're building* (the whole flow on one line, arrows, backticks), *The game plan* (numbered steps), *What you'll need* (bold generic category, a short explanation, "I'm using X" so readers can swap tools) |
| Sections | Flow with connective phrases: "Here's how:", "Let's do that", "So naturally we will want..." | `## **N. Title**` (not centered), ordered so each step builds on the last (local first, then remote) |
| New tool | Introduced with the problem it solves | Three beats before the commands: what it does here, what else could you use (linked, including heavier options with an honest "more than you need"), and why I picked it (and when the alternative is the better answer) |
| Checkpoints | Once, mid-post | At the end of most steps, plus a recap of the whole journey |
| Asides | An `<h6>` tangent for an alternative approach | An `<h6>` P.S., and a BONUS footnote for the intro (marked with `*` at the end of the list it belongs to) |

In both shapes the opening gives the reader the lay of the land before the first command or code block. If a post uses a stack the reader may not share, say so plainly and explain each piece.

### Voice
- First person and conversational: "I personally **love**...", "Honestly, familiarity.", "we", "you". Contractions, short paragraphs, plain words, rhetorical questions ("How about ✨local storage✨?").
- Opinionated but fair. Say what I use and why, and name the tool that would suit someone else better.
- Jokes are light and sparse, roughly one per section or two. They work best as an absurd comparison ("a goldfish with a keyboard", "no YAML cathedral"), a mock-objection ("Now of course you might say, ... To that I say, ..."), a self-aware aside ("Ask me how I know.", "by golly", "(AI, ladies and gentlemen)", "or something like that"), or a tongue-in-cheek bonus (the song and the refund). Keep the best-placed ones and cut a joke that's a cliché or gets between the reader and the instruction.
- Say what's left out ("What I left out, because it's beyond a one hour setup...") and what's simplified ("a dumbed down version of my use case") instead of overselling.

### Highlighting and formatting
- `<mark>` goes on the key idea or the word to remember ("tangible", "enduring", "reverse proxy", "not directly from the internet", "redundancy"). Usually one to three per section, mostly single words or short phrases, with a whole-sentence mark kept for the main takeaway. Command-heavy sections may have none.
- **Bold** is for emphasis words ("**definitely**", "**needs**"), the category label in a list, and the lead-in of a question ("**What else could you use?**"). *Italics* are for one stressed word ("*inside*").
- Backticks for commands, files, env vars, ports, tool names, and concept terms (`hydrating`, `server side rendering (SSR)`, `nginx`).
- Emoji are sparse and decorative: `✨` around one phrase, one topical emoji after a noun (🍪 after cookies, 🐳 after Docker), and `✅` on checklist items. Never in headings.
- Headings: centered bold `##` for the Context and Challenge openers, plain bold `##` for numbered steps and other sections, plain `###` for subsections. The BONUS in the intro is a footnote. Link an external tool once, on first mention.

### Code and content rules
- Every code block starts with a file-path comment (`// $lib/utils/stores.js`, `# pocketbase/Dockerfile`) and carries short comments that explain the why. Examples are the minimum that works, then built on.
- Commands are shown for the common case first, with the Windows or PowerShell variant noted beside them. State the assumptions ("Debian/Ubuntu shown").
- Anything personal or client-specific is a `<placeholder>`: servers, domains, usernames, key names. No real IPs, domains or credentials. Example emails use `@example.com` and sample passwords are obviously fake.
- "All typos are on purpose." is a running joke. Typos are the author's to sprinkle in and never go in code, commands, or tool names.
