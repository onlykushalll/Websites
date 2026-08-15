# Project: Sitegen-AI & FocusBuddy (SIa) Audit & Humanization

## Architecture
- Dual project audit and humanization pipeline.
- Target 1: `C:\Users\Default.L-HCG-9FVVGS3\Downloads\sitegen-ai` (React 19 / Vite 6 / TypeScript / Tailwind v4 Web Application)
- Target 2: `c:\Users\Default.L-HCG-9FVVGS3\OneDrive\Desktop\Utilities\SIa` (FocusBuddy WebGL / Three.js / GSAP Web Application)

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | sitegen-ai Metadata Purge | Purge AI titles, meta tags, metadata.json, README, .env.example, package.json in sitegen-ai | M2 | R1 |
| 2 | SIa (FocusBuddy) Metadata Purge | Purge NEXUS-3D title mismatch & AI footer signature in SIa index.html | M2 | R1 |
| 3 | sitegen-ai Visual Slop Purge | Eliminate ghost cards, 2px top gradient bars, tiny kickers, over-rounded 32px+ radii in App.tsx & ValentineAsk.tsx | M3 | R2 |
| 4 | SIa (FocusBuddy) Visual Slop Purge | Eliminate glass ghost-cards, gradient text clips, and tiny section kickers in style.css & index.html | M3 | R2 |
| 5 | sitegen-ai Build & Comment Cleanup | Fix vite.config.ts TS2769 lint error, fix Windows clean script, strip AI comments/typos, verify `npm run build` & `npm run lint` | M4 | R3 |
| 6 | SIa (FocusBuddy) Build & Comment Cleanup | Add missing `"build"` script to package.json, strip AI scaffold comments (F-01..F-04), verify `npm run build` & `npm test` | M4 | R3 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Survey & Discovery | Enumerate all AI signatures, metadata, comments, and visual slop | none | DONE |
| M2 | AI Metadata & Boilerplate Purge | Replace generic titles, meta tags, AI docstrings, and scaffold comments | M1 | IN_PROGRESS |
| M3 | Visual Slop & Scaffolding Purge | Refactor CSS and UI components per Impeccable design standards | M1 | IN_PROGRESS |
| M4 | Build & Forensic Audit | Clean builds (`npm run build`), lint verification, and forensic audit | M2, M3 | PLANNED |

## Code Layout & Write Ownership
- **Milestone 2 Worker Files**:
  - `sitegen-ai`: `index.html`, `metadata.json`, `package.json`, `README.md`, `.env.example`
  - `SIa`: `index.html` (metadata & title sections)
- **Milestone 3 Worker Files**:
  - `sitegen-ai`: `src/App.tsx`, `src/components/ValentineAsk.tsx` (UI styling & layout)
  - `SIa`: `style.css`, `index.html` (class references)
- **Milestone 4 Worker Files**:
  - `sitegen-ai`: `vite.config.ts`, `src/components/CatGif.tsx`, `src/components/FloatingHearts.tsx`
  - `SIa`: `package.json` (build script), `app.js` (scaffold comment cleanup)
