# Running and deploying Lexiverse

Lexiverse is a PWA: a website people install from the browser. There's no app store build.

## On your computer

```bash
npm install
npm run dev        # http://localhost:5173 with live reload
npm test           # unit tests
npm run e2e        # builds, then checks every screen at 4 widths, light and dark,
                   # accessibility (axe), 200% text, offline and install. Screenshots: tests/e2e/shots/
```

## Free hosting on Cloudflare Workers (the current Cloudflare setup screen)

In **Workers & Pages**, click **Create**, then import this GitHub repository. Use these settings:

- Project name: `lexiverse`
- Production branch: `claude/focused-thompson-pqtsz1` (this repo's only branch for now)
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Path: `/`
- API token: **Create new token** (don't reuse a token from another project)

`wrangler.jsonc` tells Cloudflare to serve the built `dist/` folder, and to send unknown paths to `index.html` so the app's routes work.
The site goes live at `https://lexiverse.<your-subdomain>.workers.dev`.

## Free hosting on Cloudflare Pages (older setup screen, also works)

1. Create a free account at dash.cloudflare.com.
2. Go to **Workers & Pages**, then **Create**, then **Pages**, then **Connect to Git**, and pick this GitHub repository.
3. Use these build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
4. Save. Every push then deploys:
   - `main` deploys to `https://<project>.pages.dev`;
   - every other branch gets its own preview link.

No `404.html` is shipped, so Pages serves `index.html` for every route, which is what the app's router expects.
`public/_headers` keeps the service worker and manifest fresh and caches the hashed assets for a year.

## Installing

- **Android (Chrome):** open the site, then tap **Install app** in the menu or the install banner.
- **iPhone (Safari):** tap **Share**, then **Add to Home Screen**.
- **Computer (Chrome or Edge):** click the install icon in the address bar.
