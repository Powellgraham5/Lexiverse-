# App icon and splash

The icon is the Orbit mark: a planet with a coral ring and a small yellow moon on the indigo brand colour.

| File | Used for |
| --- | --- |
| `design/brand/icon.svg` | Master icon with rounded corners |
| `design/brand/icon-maskable.svg` | Android adaptive icon (artwork inside the 80% safe zone) |
| `design/brand/icon-apple.svg` | iOS home screen (square, iOS rounds the corners) |
| `public/favicon.svg`, `public/icons/favicon-*.png` | Browser tab (simplified, thicker ring for 16 px) |
| `public/icons/icon-*.png`, `icon-maskable-*.png`, `apple-touch-icon.png` | Install icons |
| `public/splash/splash-*.png` | iOS launch screens, light and dark, for current iPhone sizes |
| `public/manifest.webmanifest` | Install details (name, colours, icons) |

Android builds its own launch screen from the manifest: the background colour, the icon and the name.

To change the artwork, edit `build-brand.cjs` and run `node design/brand/build-brand.cjs`.

## Tags for `index.html`

```html
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/icons/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<meta name="theme-color" content="#EEF0FF" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#07061A" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Lexiverse">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
```

Then paste the launch-screen links from `public/splash/startup-links.html`.
