import google.generativeai as genai 
import os 

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_micro_tasks(task_text):
    """
    Generate micro tasks from a  given task using Gemini AI
    """

    prompt = f"""
    You are a software project assistant.

    Break  the following task into  small actionable micro tasks. 

    Task:
    {task_text}

     Return  the result as a  numbered list. 

     """ 
    
    try:
        response = model.generate_content(prompt)

        text_output = response.text 

        tasks = []

        for line in text_output.split("\n"):
            line = line.strip()

            if line and line[0].isdigit():
                task = line.split(".", 1)[1].strip()
                tasks.append(task)
        return tasks 

    except Exception as e:
        print("AI generation error:", e)


        return[
            "Analyze the task requirements",
            "Identify affected files",
            "Implemement the necessary  changes",
            "write tests for the changes"
        ]    
    
    

        
    