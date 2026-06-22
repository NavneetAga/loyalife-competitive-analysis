# Loyalife — Competitive Intelligence

Interactive, data- and growth-oriented competitor analysis for Loyalife (Xoxoday's enterprise loyalty platform), covering consumer and channel loyalty.

Built with React + Vite. Single-page app, no backend — all data is in `src/App.jsx`.

## Tabs

- **All Competitors** — full profiles for Loyalife + 14 competitors
- **Market & Growth** — TAM sizing, growth narratives, competitor growth signals, 2026 benchmarks
- **By Region** — players ranked per region (India, SEA, GCC, US, Europe, APAC)
- **By Industry** — players ranked per vertical (BFSI, FMCG, Retail, Paints, Auto, Travel, Pharma)
- **Data Matrix** — side-by-side metrics with hover definitions
- **Loyalty Metrics** — 16 success metrics with formulas and benchmarks

---

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

To preview a production build:

```bash
npm run build
npm run preview
```

---

## Deploy to GitHub Pages (automated)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys automatically.

### One-time setup

1. Create a new repo on GitHub and push this folder to it:

   ```bash
   git init
   git add .
   git commit -m "Loyalife competitive analysis"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. On GitHub: go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.

That's it. Every push to `main` rebuilds and redeploys. The site will be live at:

```
https://<your-username>.github.io/<your-repo>/
```

(First deploy takes ~1–2 minutes. Check the **Actions** tab for progress.)

---

## Notes

- `vite.config.js` uses `base: "./"` so the build works from a project sub-path — no edits needed regardless of your repo name.
- For internal use only. Revenue figures are estimates or publicly disclosed figures unless noted.
