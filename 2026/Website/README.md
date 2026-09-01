# State of the Map Kerala 2026 — website

A simple, dependency-free static site (plain HTML/CSS/JS, no build step) for kl.stateofthemap.in.

## Structure

```
index.html
assets/
  css/style.css
  js/main.js
  logo.svg, logo.png, favicon.png
  img/2022.jpg, 2023.jpg, 2024.jpg, 2025.jpg   (previous-edition group photos)
```

## Deploying to kl.stateofthemap.in

Any static host works since there's no build step — just upload the contents of this folder as-is.

- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop this folder, or connect a git repo containing it, then point the `kl` subdomain at it via a CNAME.
- **GitHub Pages**: push this folder to a repo, enable Pages, add a `CNAME` file containing `kl.stateofthemap.in`, and point the DNS `kl` record to GitHub Pages.
- **Any regular web host**: upload the folder over SFTP into the web root for the `kl` subdomain.

Either way, set the `kl` subdomain's DNS to point at wherever it's hosted (a CNAME record, usually) once you've picked a host.

## Editing content

Everything is in `index.html` — sections are commented with `id`s (`about`, `schedule`, `editions`, `sponsors`, `contact`). Colours and spacing are in `assets/css/style.css` under `:root` at the top. The schedule is currently a placeholder ("full session list to be announced") — update it once the agenda is set.
