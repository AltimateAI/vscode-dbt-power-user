## Fixes

- Make setup wizard steps clickable so users can navigate back and forth between steps
- Remove fixed sidebar width (280px) — sidebar now sizes to content
- Responsive layout: steps switch from vertical sidebar to horizontal top bar on narrow screens (≤700px)
- Add "Tutorials" button on the landing page to jump directly to the tutorials step
- Fix broken documentation URLs (404) — point all doc links to `https://docs.myaltimate.com/`
- Fresh install now shows the "Supercharge" landing page first instead of jumping straight to prerequisites
- Click-to-expand overlay on tutorial images for full-size viewing
- Pre-select the correct integration type in the "Install dbt" step based on the already-chosen type
- Fix false "Installation successful" for dbt Fusion/Cloud — verify dbt is actually detected after install, show actionable error if not
- Fix Fusion CLI detection (in `altimate-dbt-integration` PR #35) — was finding dbt Core in Python venv instead of Fusion binary at `~/.local/bin/dbt`
- Fix Python version not updating in setup UI after changing interpreter — refresh version from Python extension API on each diagnostics check
