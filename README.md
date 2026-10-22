# NOVA Discovery

NOVA Discovery is the public astronomy journal at `novadiscovery.space`, built with Next.js, React, and Supabase. The site reads published content from the existing NOVA astronomy workflow; it does not create or edit articles.

## Local development

Install dependencies with `npm ci`. Supply `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`, then run:

```sh
npm run dev -- --port 3004
```

Port 3004 keeps the blog separate from the personal NOVA app on port 3000. For a production preview, run `npm run build`, followed by `npm run start -- --port 3004`.

## Content and layout

- `app/globals.css` contains the shared design and responsive layouts. Base resets stay inside the Tailwind base layer.
- `components/PostCard.tsx` and `components/TopicArt.tsx` provide article cards and decorative astronomy artwork.
- `components/MarkdownRenderer.tsx` renders Markdown with lists and tables, without executing raw HTML. Sources and videos are displayed by the article page.
- `/blog` supports title/summary search (`q`), topic filtering (`topic`), and pagination (`page`). Queries only return published articles.
- `lib/supabase.ts` reads `astronomy_posts` and `astronomy_categories`. An empty public feed can mean no published content is available to the public database role; check that separately from the page layout.

## Home Screen app

`app/manifest.ts` defines the installable app. `app/layout.tsx` supplies viewport, theme, and Apple Home Screen metadata. The mobile interface uses bottom navigation and safe-area spacing.

Use **Get the app** for browser installation or iPhone/iPad instructions. Installation on the live site requires HTTPS. The app currently requires an internet connection; it does not cache articles for offline reading or send notifications.

To regenerate the SVG, PNG, Apple, and maskable app icons after changing their design:

```sh
npm run icons
```

Check `npm run build` before publishing. Visual changes should also be checked at phone, tablet, and desktop widths. Deployments continue through the existing GitHub/hosting setup.
