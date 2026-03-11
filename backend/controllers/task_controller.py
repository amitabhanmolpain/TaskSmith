from flask import request, jsonify
from models.task_model import Task 
from config.db import tasks_collection 
from services.ai_service import generate_micro_tasks

def create_task():
    try:
        data = request.json
        task_text = data.get("task")

        if not task_text:
            return jsonify({"error": "Task is  required"}), 400
        

        micro_tasks = generate_micro_tasks(task_text)

        task =  Task(task_text, micro_tasks)

        result  = tasks_collection.insert_one(task.to_dict())

        
        return jsonify({
            "message": "Task generated successfully",
            "task_id": str(result.inserted_id),
            "task": task_text,
            "micro_tasks": micro_tasks 
        }), 201


    except  Exception as e:
        return jsonify({"error": str(e)}), 500
    

def get_tasks():
        try:
            tasks = []

            for task in tasks_collection.find():
                tasks.append(Task.from_dict(task))

            return jsonify(tasks), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500                
