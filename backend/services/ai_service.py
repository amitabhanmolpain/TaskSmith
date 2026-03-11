from google import genai
import os
import re
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_micro_tasks(task_text):

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

Only return the numbered list. Do not include introductions, explanations, markdown code fences, or extra notes.

INPUT TASK:
{task_text}
"""

    try:
        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt
        )

        output = response.text or ""
        output = output.replace("**", "").replace("`", "")
        lines = [line.rstrip() for line in output.splitlines() if line.strip()]

        tasks = []
        current_block = []

        for raw_line in lines:
            line = raw_line.strip()
            if re.match(r"^\d+\.\s+", line):
                if current_block:
                    tasks.append(" | ".join(current_block))
                current_block = [line]
            elif current_block:
                current_block.append(line)

        if current_block:
            tasks.append(" | ".join(current_block))

        if tasks:
            return tasks

        # Fallback when the model returns unstructured text.
        fallback = []
        for line in lines:
            if re.match(r"^\d+\.\s+", line):
                fallback.append(re.sub(r"^\d+\.\s+", "", line).strip())

        return fallback if fallback else ["1. Define implementation task | Label: Backend | File: backend/services/ai_service.py | Description: Refine prompt and parsing logic. | Goal: Return structured micro-tasks reliably."]

    except Exception:
        return [
            "1. Check the input task text | Label: Backend | File: backend/controllers/task_controller.py | Description: Make sure the request includes the main task text before sending it to the AI service. | Goal: Prevent empty or unclear requests.",
            "2. Update the AI prompt | Label: Backend | File: backend/services/ai_service.py | Description: Tell the AI to write tasks in simple words and include a clear role label. | Goal: Make the output easy to read.",
            "3. Check the API response | Label: Integration | File: backend/controllers/task_controller.py | Description: Confirm the backend returns the micro_tasks list in the expected format. | Goal: Keep the frontend and backend working together.",
            "4. Review task display in the UI | Label: Frontend | File: src/components/MicroTaskList.tsx | Description: Make sure each task label and text is easy to scan in the frontend list. | Goal: Help developers read tasks faster.",
            "5. Run a quick test | Label: QA | File: backend/test.py | Description: Send one sample task to the AI service and review the returned micro-tasks. | Goal: Catch prompt or parsing problems early."
        ]