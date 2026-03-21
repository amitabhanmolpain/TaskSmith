from google import genai
import os
import re
from typing import Dict, List
from dotenv import load_dotenv

load_dotenv()

ALLOWED_LABELS = {"Frontend", "Backend", "Database", "QA", "DevOps", "Integration"}

REPO_FILES = {
    "Backend": [
        "backend/run.py",
        "backend/routes/task_routes.py",
        "backend/controllers/task_controller.py",
        "backend/services/ai_service.py",
        "backend/models/task_model.py",
        "backend/config/db.py",
        "backend/test.py",
    ],
    "Frontend": [
        "src/pages/Index.tsx",
        "src/components/MicroTaskList.tsx",
        "src/components/MicroTaskCard.tsx",
        "src/components/GenerateButton.tsx",
        "src/components/TaskInput.tsx",
    ],
    "Database": ["backend/config/db.py", "backend/models/task_model.py"],
    "QA": ["backend/test.py"],
    "DevOps": ["backend/run.py"],
    "Integration": ["backend/routes/task_routes.py", "backend/controllers/task_controller.py"],
}

ALL_REPO_FILES = {path for files in REPO_FILES.values() for path in files}


def _normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "")).strip()


def _get_genai_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    return genai.Client(api_key=api_key)


def _sanitize_label(label: str) -> str:
    cleaned = _normalize_text(label).lower()
    for allowed in ALLOWED_LABELS:
        if cleaned == allowed.lower():
            return allowed
    if "front" in cleaned:
        return "Frontend"
    if "back" in cleaned or "api" in cleaned:
        return "Backend"
    if "db" in cleaned or "data" in cleaned:
        return "Database"
    if "test" in cleaned or "qa" in cleaned:
        return "QA"
    if "devops" in cleaned or "deploy" in cleaned:
        return "DevOps"
    return "Integration"


def _sanitize_file(file_path: str, label: str) -> str:
    cleaned = _normalize_text(file_path)
    if cleaned in ALL_REPO_FILES:
        return cleaned

    # If model returns an unknown path, map it to the closest allowed file by label.
    return REPO_FILES.get(label, ["backend/services/ai_service.py"])[0]


def _format_micro_task(index: int, task_data: Dict[str, str]) -> str:
    title = _normalize_text(task_data.get("title") or f"Task {index}")
    label = _sanitize_label(task_data.get("label", "Integration"))
    file_path = _sanitize_file(task_data.get("file", ""), label)
    description = _normalize_text(task_data.get("description") or "Implement the required update.")
    goal = _normalize_text(task_data.get("goal") or "Complete a meaningful part of the work.")

    return (
        f"{index}. {title} | Label: {label} | File: {file_path} | "
        f"Description: {description} | Goal: {goal}"
    )


def _extract_field(block: str, key: str) -> str:
    pattern = re.compile(rf"{key}:\s*(.*?)(?=\s+(?:Label|File|Description|Goal):|$)", re.IGNORECASE | re.DOTALL)
    match = pattern.search(block)
    return _normalize_text(match.group(1)) if match else ""


def _parse_ai_output(output: str) -> List[str]:
    text = (output or "").replace("**", "").replace("`", "").strip()
    if not text:
        return []

    sections = re.split(r"\n(?=\s*\d+\.\s+)", text)
    tasks = []

    for section in sections:
        section = section.strip()
        if not section:
            continue

        lines = [line.strip() for line in section.splitlines() if line.strip()]
        if not lines:
            continue

        header = lines[0]
        number_match = re.match(r"^(\d+)\.\s*(.*)$", header)
        if not number_match:
            continue

        index = int(number_match.group(1))
        title = _normalize_text(number_match.group(2))
        merged = _normalize_text(" ".join(lines[1:]))

        task_data = {
            "title": title,
            "label": _extract_field(merged, "Label") or "Integration",
            "file": _extract_field(merged, "File"),
            "description": _extract_field(merged, "Description"),
            "goal": _extract_field(merged, "Goal"),
        }

        tasks.append(_format_micro_task(index, task_data))

    return tasks


def _select_primary_label(task_text: str) -> str:
    lowered = task_text.lower()
    if any(word in lowered for word in ["ui", "ux", "page", "button", "component", "react", "frontend"]):
        return "Frontend"
    if any(word in lowered for word in ["db", "database", "schema", "mongo", "query"]):
        return "Database"
    if any(word in lowered for word in ["test", "qa", "bug", "verify"]):
        return "QA"
    if any(word in lowered for word in ["deploy", "server", "run", "devops", "infra"]):
        return "DevOps"
    if any(word in lowered for word in ["api", "route", "controller", "service", "backend"]):
        return "Backend"
    return "Integration"


def _generate_dynamic_fallback(task_text: str) -> List[str]:
    cleaned_task = _normalize_text(task_text) or "the requested feature"
    primary_label = _select_primary_label(cleaned_task)
    primary_file = REPO_FILES.get(primary_label, ["backend/services/ai_service.py"])[0]

    fallback_plan = [
        {
            "title": f"Clarify the expected result for: {cleaned_task}",
            "label": "Integration",
            "file": "backend/controllers/task_controller.py",
            "description": "Review incoming task text and list the exact output the micro-task generator should return.",
            "goal": "Ensure generation follows a clear and testable outcome.",
        },
        {
            "title": "Implement the core generation logic",
            "label": primary_label,
            "file": primary_file,
            "description": f"Add or update logic to handle '{cleaned_task}' with concrete steps and no placeholder wording.",
            "goal": "Produce actionable micro tasks that map to real code changes.",
        },
        {
            "title": "Wire task output through the API response",
            "label": "Backend",
            "file": "backend/controllers/task_controller.py",
            "description": "Validate generated task entries and return them in a consistent list format.",
            "goal": "Keep frontend consumption stable and predictable.",
        },
        {
            "title": "Add validation for malformed AI output",
            "label": "Backend",
            "file": "backend/services/ai_service.py",
            "description": "Parse model output and normalize missing fields such as Label, File, Description, and Goal.",
            "goal": "Avoid broken tasks when the model response is partially formatted.",
        },
        {
            "title": "Run a focused generation test",
            "label": "QA",
            "file": "backend/test.py",
            "description": f"Submit '{cleaned_task}' and verify every returned item has a clear title, file path, description, and goal.",
            "goal": "Confirm micro-task quality before using it in the UI.",
        },
    ]

    return [_format_micro_task(i + 1, task) for i, task in enumerate(fallback_plan)]


def generate_micro_tasks(task_text):
    cleaned_task_text = _normalize_text(task_text)
    if not cleaned_task_text:
        return []

    prompt = f"""
You are an expert Senior Software Engineer and Technical Project Planner.

Your task is to convert a high-level engineering task, feature request, or GitHub issue into clear, actionable micro-tasks that developers in a team can execute.

IMPORTANT RULES:
1. Tasks must be actionable and specific.
2. Each task should take approximately 10-30 minutes for a developer.
3. Avoid vague tasks like "Set up project", "Implement feature", or "Do testing".
4. Every task must include:
   - Task Title
    - Label (Frontend, Backend, Database, QA, DevOps, or Integration)
   - File / Location
   - Description
   - Goal
5. Follow a logical workflow: understanding issue, code changes, validation, testing, integration.
6. Prefer concrete engineering tasks with exact files/modules and API or DB changes if needed.
7. Keep each task concise but immediately actionable.
8. Use simple plain English that a partially skilled developer can understand quickly.
9. Prefer short sentences and common action words like "add", "update", "check", "show", or "save".
10. Avoid heavy jargon, buzzwords, or advanced terms unless they are necessary.
11. If you must use a technical term, explain it in simple words inside the same sentence.
12. Write tasks so a developer can start coding without needing to translate the wording.

Repository structure you must use for file references:
- Backend: backend/run.py, backend/routes/task_routes.py, backend/controllers/task_controller.py, backend/services/ai_service.py, backend/models/task_model.py, backend/config/db.py, backend/test.py
- Frontend: src/pages/Index.tsx, src/components/MicroTaskList.tsx, src/components/MicroTaskCard.tsx, src/components/GenerateButton.tsx, src/components/TaskInput.tsx
Only reference files/modules that exist in this repository structure.
Never invent new files or folders.
If a requested change would require a non-listed file, remap it to the closest listed file.

OUTPUT FORMAT (strict):
1. <Task Title>
    Label: <Frontend|Backend|Database|QA|DevOps|Integration>
   File: <exact file or module>
   Description: <what to implement>
   Goal: <why it exists>

QUALITY RULES:
- Return 5 to 8 micro tasks.
- Every task must include all 4 fields exactly once: Label, File, Description, Goal.
- Do not return placeholders like "TBD", "N/A", or "Not specified".
- Use short, direct action language.

Only return the numbered list. Do not include introductions, explanations, markdown code fences, or extra notes.

INPUT TASK:
{cleaned_task_text}
"""

    try:
        client = _get_genai_client()
        if client is None:
            return _generate_dynamic_fallback(cleaned_task_text)

        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt
        )

        parsed_tasks = _parse_ai_output(response.text or "")
        if parsed_tasks:
            return parsed_tasks

        return _generate_dynamic_fallback(cleaned_task_text)

    except Exception:
        return _generate_dynamic_fallback(cleaned_task_text)