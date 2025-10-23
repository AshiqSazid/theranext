#!/usr/bin/env python3

"""
Thin CLI wrapper around the existing Python TheraMuse implementation.
This module communicates via stdin/stdout using JSON payloads so that the
Next.js API routes can orchestrate recommendation and feedback workflows
without re-implementing the machine learning stack in TypeScript.
"""

from __future__ import annotations

import io
import base64
import json
import sys
from contextlib import redirect_stdout
from datetime import datetime
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, Optional

ROOT_DIR = Path(__file__).resolve().parent.parent
PARENT_ROOT = ROOT_DIR.parent
for candidate in (ROOT_DIR, PARENT_ROOT):
    candidate_str = str(candidate)
    if candidate_str not in sys.path:
        sys.path.insert(0, candidate_str)


@dataclass
class Payload:
    action: str
    data: Dict[str, Any]
    db_path: Optional[str] = None
    model_path: Optional[str] = None

    @staticmethod
    def from_json(raw: str) -> "Payload":
        parsed = json.loads(raw)
        return Payload(
            action=parsed.get("action", ""),
            data=parsed.get("data", {}),
            db_path=parsed.get("db_path"),
            model_path=parsed.get("model_path"),
        )


def _load_theramuse(db_path: Optional[str], model_path: Optional[str]):
    """
    Import and instantiate TheraMuse while redirecting stdout so that any
    diagnostic prints do not corrupt the JSON response.
    """
    log_buffer = io.StringIO()
    with redirect_stdout(log_buffer):
        from ml import TheraMuse  # type: ignore

        instance = TheraMuse(
            db_path=db_path or "theramuse.db",
            model_path=model_path or "theramuse_model.pkl",
    )
    logs = log_buffer.getvalue()
    if logs:
        print(logs, file=sys.stderr)
    return instance


def handle_recommendations(tm, payload: Payload) -> Dict[str, Any]:
    patient_info = payload.data.get("patient_info") or {}
    condition = payload.data.get("condition")
    patient_id = payload.data.get("patient_id")

    if not condition:
        raise ValueError("Missing condition for recommendation request")

    log_buffer = io.StringIO()
    with redirect_stdout(log_buffer):
        recommendations = tm.get_therapy_recommendations(
            patient_info,
            condition,
            patient_id,
        )
    logs = log_buffer.getvalue()
    if logs:
        print(logs, file=sys.stderr)

    return {
        "recommendations": recommendations,
    }


def handle_feedback(tm, payload: Payload) -> Dict[str, Any]:
    session_id = payload.data.get("session_id")
    patient_id = payload.data.get("patient_id")
    condition = payload.data.get("condition")
    song = payload.data.get("song") or {}
    feedback_type = payload.data.get("feedback_type")
    patient_info = payload.data.get("patient_info")

    if not all([session_id, patient_id, condition, feedback_type]):
        raise ValueError("Feedback request missing required fields")

    log_buffer = io.StringIO()
    with redirect_stdout(log_buffer):
        tm.record_feedback(
            patient_id=patient_id,
            session_id=session_id,
            condition=condition,
            song=song,
            feedback_type=feedback_type,
            patient_info=patient_info,
        )
    logs = log_buffer.getvalue()
    if logs:
        print(logs, file=sys.stderr)

    return {"status": "ok"}


def handle_export(payload: Payload) -> Dict[str, Any]:
    export_format = (payload.data.get("format") or "").lower()
    patient_info = payload.data.get("patient_info") or {}
    recommendations = payload.data.get("recommendations") or {}
    big5_scores = payload.data.get("big5_scores") or {}

    try:
        from reports import (
            generate_docx_report,
            generate_pdf_report,
            generate_json_report,
        )
    except ImportError as exc:  # pragma: no cover - dependency guard
        raise RuntimeError(
            "Export functionality requires optional dependencies. Install python-docx and fpdf."
        ) from exc

    if export_format == "docx":
        content = generate_docx_report(patient_info, recommendations, big5_scores)
        filename = f"theramuse_report_{datetime.now().strftime('%Y%m%d%H%M%S')}.docx"
        mime_type = (
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    elif export_format == "pdf":
        content = generate_pdf_report(patient_info, recommendations, big5_scores)
        filename = f"theramuse_report_{datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"
        mime_type = "application/pdf"
    elif export_format == "json":
        content = generate_json_report(patient_info, recommendations, big5_scores)
        filename = f"theramuse_report_{datetime.now().strftime('%Y%m%d%H%M%S')}.json"
        mime_type = "application/json"
    else:
        raise ValueError(f"Unsupported export format: {export_format}")

    return {
        "content": base64.b64encode(content).decode("utf-8"),
        "filename": filename,
        "mimeType": mime_type,
    }


def handle_analytics(tm) -> Dict[str, Any]:
    log_buffer = io.StringIO()
    with redirect_stdout(log_buffer):
        analytics = tm.get_analytics()
    logs = log_buffer.getvalue()
    if logs:
        print(logs, file=sys.stderr)
    return {"analytics": analytics}


def main() -> int:
    raw_input = sys.stdin.read()
    if not raw_input:
        print(json.dumps({"error": "Empty payload"}))
        return 1

    try:
        payload = Payload.from_json(raw_input)
    except json.JSONDecodeError as exc:
        print(json.dumps({"error": f"Invalid JSON payload: {exc}"}))
        return 1

    tm = None
    try:
        if payload.action == "export":
            result = handle_export(payload)
        else:
            tm = _load_theramuse(payload.db_path, payload.model_path)
            if payload.action == "recommend":
                result = handle_recommendations(tm, payload)
            elif payload.action == "feedback":
                result = handle_feedback(tm, payload)
            elif payload.action == "analytics":
                result = handle_analytics(tm)
            else:
                raise ValueError(f"Unsupported action: {payload.action}")
    except Exception as exc:  # pragma: no cover - defensive
        print(json.dumps({"error": str(exc)}))
        return 1
    finally:
        if tm is not None:
            log_buffer = io.StringIO()
            with redirect_stdout(log_buffer):
                try:
                    tm.close()
                except Exception:
                    pass
            logs = log_buffer.getvalue()
            if logs:
                print(logs, file=sys.stderr)

    print(json.dumps(result, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
