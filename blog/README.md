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
