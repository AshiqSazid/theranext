# TheraMuse RX – Next.js Edition

TheraMuse RX is a full-stack port of the original Streamlit music therapy assistant into the Next.js `app` router.
The solution keeps the proven Python machine-learning core (`ml.py`) while delivering a modern React interface,
streamlined analytics dashboards, and RESTful endpoints that orchestrate the recommendation engine.

## Highlights

- **Comprehensive Intake Workflow** – Recreates the Streamlit experience with demographics, cultural preferences,
  cognitive indicators, and a Big Five assessment.
- **Python ↔️ Next.js Bridge** – API routes invoke `scripts/theramuse_cli.py`, which wraps the `TheraMuse`
  class. This keeps reinforcement learning, YouTube discovery, and document export logic written in Python.
- **Real‑time Feedback Loop** – Like/Dislike/Skip feedback is captured from the UI and piped back to
  `TheraMuse.record_feedback`, updating the contextual Thompson Sampling model.
- **Operational Views** – Patient database browser, analytics dashboards, and a curated research evidence hub.
- **TypeScript First** – Shared types in `lib/types.ts` and SQLite helpers in `lib/db.ts` keep the React surface
  strongly typed and aligned with the underlying schema.

## Project Structure

```
app/                  # Next.js app router
  api/                # API routes bridging to Python
  analytics/          # Analytics dashboard page
  database/           # Patient records page
  research/           # Research evidence summaries
  about/              # About & capability overview
  page.tsx            # User intake + recommendations
components/           # Reusable UI components
content/              # Long-form research copy
lib/                  # Shared types, DB helpers, server utilities
scripts/theramuse_cli.py  # JSON CLI wrapper around ml.py
```

## Quick Start

```bash
cd app
npm install
npm run dev
```

The development server expects to find the SQLite database (`theramuse.db`) and model artefacts at the project
root. Override paths as needed via environment variables:

```
THERAMUSE_DB_PATH=/absolute/path/to/theramuse.db
THERAMUSE_MODEL_PATH=/absolute/path/to/theramuse_model.pkl
THERAMUSE_PYTHON_BINARY=python3.11  # optional python executable
```

## Feedback & Recommendations Flow

1. The intake form posts to `POST /api/recommendations`.
2. The API calculates Big Five scores, prepares `patient_info`, and runs `scripts/theramuse_cli.py` with
   the `recommend` action.
3. The Python layer returns the raw recommendation payload which is rendered by `RecommendationResults`.
4. User feedback buttons call `POST /api/feedback`, which reuses the CLI bridge with the `feedback` action.

## Tooling

- **Next.js 14 / React 18** for the UI.
- **Tailwind-inspired utility CSS** in `app/globals.css` for bespoke styling.
- **Recharts** for analytics visualisations.
- **better-sqlite3** for server-side data access to the existing SQLite store.

## Testing Notes

- Run `npm run lint` inside the `app/` directory to validate TypeScript and linting rules.
- End-to-end behaviour depends on the Python environment; ensure the `ml.py` dependencies listed in
  `requirements.txt` are installed for the CLI bridge to respond correctly.

## Licensing

The port retains all analytical models and datasets from the original Streamlit project. Respect the
licensing of YouTube content and patient data within your environment. Use responsibly in clinical or
research settings.
