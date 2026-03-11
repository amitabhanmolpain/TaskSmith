from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_micro_tasks(task_text):

    prompt = f"""
You are an expert software engineering assistant.

Break the following task into small actionable developer micro-tasks.

Task:
{task_text}

Return only a numbered list.
"""

    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents=prompt
    )

    output = response.text

    tasks = []

    for line in output.split("\n"):
        line = line.strip()
        if line and line[0].isdigit():
            tasks.append(line.split(".",1)[1].strip())

    return tasks