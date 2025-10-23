# Setup Guide

This guide walks through preparing the Next.js + Python hybrid stack for TheraMuse RX.

## 1. Prerequisites

- Node.js 18+
- Python 3.9+ (matching the dependencies in `requirements.txt`)
- SQLite 3 (already bundled on most systems)

Install Python dependencies into a virtual environment:

```bash
python -m venv theramusenv
source theramusenv/bin/activate
pip install -r requirements.txt
```

## 2. Install JavaScript Dependencies

```bash
cd app
npm install
```

## 3. Configure Environment Variables (optional)

Create a `.env.local` file in the `app/` directory to customise runtime paths:

```
THERAMUSE_DB_PATH=/absolute/path/to/theramuse.db
THERAMUSE_MODEL_PATH=/absolute/path/to/theramuse_model.pkl
THERAMUSE_PYTHON_BINARY=python3
```

If omitted, the application defaults to `theramuse.db` and `theramuse_model.pkl` in the repository root and
uses `python3` on your `$PATH`.

## 4. Launch the Development Server

```bash
cd app
npm run dev
```

Open `http://localhost:3000` to access the UI. The API routes invoke `scripts/theramuse_cli.py`, so ensure
Python dependencies are installed and the database file is writable.

## 5. Database Seeding (optional)

If you are porting from the Streamlit project, copy the existing `theramuse.db` into the repository root.
New patient intake sessions will automatically populate the same database schema.

## 6. Testing & Linting

```bash
cd app
npm run lint
```

The lint script validates TypeScript types and ESLint rules. Python logic is executed indirectly through the CLI;
use your preferred Python testing framework if you need regression coverage on `ml.py`.

## 7. Production Build

```bash
cd app
npm run build
npm run start
```

Ensure the production host has access to the SQLite file and Python runtime. The Next.js server must have
permission to execute the CLI script.

## 8. Troubleshooting

- **Command not found (`python3`)**: set `THERAMUSE_PYTHON_BINARY` to the explicit interpreter.
- **JSON parse errors**: verify `ml.py` does not print to stdout; the CLI wrapper redirects prints to stderr.
- **SQLite locking**: `better-sqlite3` opens the database in shared mode. Avoid running concurrent writers outside
  the app.

Happy experimenting!
