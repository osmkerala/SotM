# State of the Map Kerala 2026 — website

A simple, dependency-free static site (plain HTML/CSS/JS, no build step) for kerala.stateofthemap.in.

## Structure

```
index.html
assets/
  css/style.css
  js/main.js
  logo.svg, logo.png, favicon.png
  img/2022.jpg, 2023.jpg, 2024.jpg, 2025.jpg   (previous-edition group photos)
```

## Deploying to kerala.stateofthemap.in

Any static host works since there's no build step — just upload the contents of this folder as-is.

- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop this folder, or connect a git repo containing it, then point the `kerala` subdomain at it via a CNAME.
- **GitHub Pages**: push this folder to a repo, enable Pages, add a `CNAME` file containing `kerala.stateofthemap.in`, and point the DNS `kerala` record to GitHub Pages.
- **Any regular web host**: upload the folder over SFTP into the web root for the `kerala` subdomain.

Either way, set the `kerala` subdomain's DNS to point at wherever it's hosted (a CNAME record, usually) once you've picked a host.

## Editing content

Everything is in `index.html` — sections are commented with `id`s (`about`, `schedule`, `register`, `editions`, `sponsors`, `contact`). Colours and spacing are in `assets/css/style.css` under `:root` at the top. Two sections are still placeholders:

- **Schedule** (`#schedule`) — shows day-level slots only, with a "detailed schedule will be updated soon" note. Fill in the real sessions once the agenda is set.
- **Register** (`#register`) — a "coming soon" banner linking to the OSM wiki page for updates. Replace it with a real registration link/form once one exists.

Contact details are a single address, `contact@stateofthemap.in` (used for both the Contact section and the sponsorship-request button) — update `mailto:` links in `index.html` if that changes.
