# AGENTS.md

Static React dashboard for K-Means customer segmentation. No backend and no Python runtime — the trained model is shipped as JSON and its math is reimplemented in the browser.

## Layout

- `frontend/` — the entire app (Vite + React 19 + Recharts).
- `ml/` — dataset and training exports (`model.json`, `cluster_stats.json`).
- Root `package.json` / `package-lock.json` are not used by the app or CI. Run all npm commands from `frontend/`; CI installs with `npm ci` against `frontend/package-lock.json`.

## Commands (run from `frontend/`)

```bash
npm install
npm run dev      # Vite base is /CustomerIQ/, so open http://localhost:5173/CustomerIQ/
npm run build    # outputs frontend/dist
npm run lint     # oxlint, config in frontend/.oxlintrc.json
npm run preview
```

- There is no test suite and no typecheck script. Verify changes with `npm run lint` + `npm run build`.
- `npm run build` warns that the bundle exceeds 500 kB (mostly Recharts). This is expected, not a failure.
- CI uses Node 22.

## Model/data wiring

- `ml/model.json` and `ml/cluster_stats.json` are the source artifacts; `frontend/public/` contains the copies actually served at runtime. Update **both** locations when the model changes, or the deployed UI keeps using stale data.
- Prediction is pure JS in `frontend/src/utils/predict.js`: standardize income/spending with `model.mean` / `model.scale`, then pick the nearest centroid. No API call.
- `predictCluster` returns a centroid index, and `CustomerForm` looks up `clusters.find(c => c.id === clusterId)`. When retraining, keep `model.json` centroid order aligned with `cluster_stats.json` cluster `id`s.
- Load public assets via `${import.meta.env.BASE_URL}...` (as `App.jsx` does), never as absolute `/...` paths — the site is hosted under `/CustomerIQ/`.
- `ml/CustomerIQ_KMeans_Implementation.ipynb` is committed empty (0 bytes). The usable sources are the existing JSON artifacts plus `ml/Mall_Customers.csv`; do not assume the notebook can be run as-is.
- README contains a model-parameters table, segment statistics, and silhouette score that duplicate these JSON files. Keep it in sync if those values change.

## Styling

- Tailwind v4 is installed and imported in `src/index.css`, but the UI is styled with hand-written class names in `src/App.css` (e.g. `panel`, `stat-card`, `segments-grid`). Add new styles there rather than mixing in Tailwind utilities.

## Deploy

- Push to `main` triggers `.github/workflows/deploy.yml`, which builds `frontend/` and publishes `frontend/dist` to GitHub Pages. No PR preview; a broken build on `main` fails the deploy.
- `vite.config.js` `base: '/CustomerIQ/'` must match the GitHub Pages repo path. If the repo is renamed, update `base` and the in-app asset URLs follow automatically.
