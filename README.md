# Laura Anthony — the courtyard

A single-page personal website built with **Next.js App Router, React, TypeScript, and Tailwind CSS v4**. Real courtyard photography, warm colors, first-person writing, and a deliberately small footprint. Bricolage Grotesque headings and DM Sans body text are served locally, along with the images. There are no analytics scripts, remote font requests, or advertising cookies.

## Develop

Use Node.js 24 LTS (`nvm use`) and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Next.js. Production commands:

```sh
npm test
npm run build
npm run typecheck
npm start
```

Browser and accessibility checks cover desktop Chromium and iPhone-sized WebKit, including a small iPhone viewport:

```sh
npx playwright install chromium webkit
npx playwright test
```

Playwright emulates browser engines and viewports; physical iPhone and Mac testing is still useful before launch.

## Edit the content

- `app/page.tsx`: the single scrolling page, personal introduction, background, and contact.
- `lib/profile.ts`: project descriptions, project statuses, contact details, profile-guide answers, and optional AI grounding.
- `app/globals.css`: colors, spacing, typography, and responsive layouts. Tailwind utilities and semantic component classes share the same theme.
- `public/images/`: local images. The courtyard is an atmospheric stock photograph, not Laura’s home or a project she designed. Attribution appears below it; see `docs/image-credits.md`.

## Questions and privacy

The default profile guide matches questions to published facts entirely in the visitor’s browser. It is a deterministic guide, not a generative model. Questions remain in memory until navigation or refresh; the site does not save them.

Cloud AI is optional. If `ANTHROPIC_API_KEY` is configured on the server, visitors can explicitly enable an Anthropic-powered answer in “How it works.” Only their next question is submitted; earlier questions are not uploaded. Provider processing is separate from this site’s storage behavior. No cloud request is made by the default guide.

Copy `.env.example` to `.env.local` to configure the optional assistant. Keep the key server-side. `ANTHROPIC_MODEL` is configurable, with the original site’s model as default. The API validates origin, consent, role, and size, has a timeout, and returns generic errors. Profile answers remain available when AI is unconfigured or unavailable. Configure host-level request rate limits before exposing a paid AI endpoint to heavy public traffic.

## Deployment

Production is hosted at **https://lanthony.app** on the existing Cloudflare Pages project `websites`, connected to `main` in `lbanthony/website`.

Cloudflare build command: `npm run build:pages`. Build output directory: `out`. The build renders the Next.js page to HTML and generates responsive WebP photos locally. It keeps React interactions, Tailwind styles, and fonts on the same origin without requiring a paid image service.

The optional cloud assistant runs in `functions/api/chat.ts`, using the existing Pages server secret `ANTHROPIC_API_KEY`. It shares its validation and response handling with the native Next.js route through `lib/chat.ts`. The browser-only profile guide remains the default. `_routes.json` limits Function execution to `/api/chat`; other requests serve static files. Do not upload `.next` or the repository root as the Pages build output.

To check the Pages version locally:

```sh
npm run build:pages
npx wrangler pages dev out --port 3001
```

Optional local Pages secrets belong in ignored `.dev.vars`. Rebuild with `npm run build` before using `npm start` again, since the Pages build replaces `.next` with the export build.

Deploy using a host with native Next.js support, such as Vercel, or run `npm run build` and `npm start` on a Node server. Build command: `npm run build`. No static output directory is needed on a native Next.js host. Add `ANTHROPIC_API_KEY` only if cloud AI is wanted.

Main content arrives as rendered HTML, images use `next/image` with responsive optimization, and only the question guide needs client-side state. Layouts cover phones through large desktops, keyboard navigation, visible focus, native disclosure controls, and reduced-motion preferences. Tailwind v4 targets modern browsers, including Safari 16.4+.

Official references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [Cloudflare Next.js static deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).
