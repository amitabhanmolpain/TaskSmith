from datetime import datetime 
from bson import objectId 

class Task:
    def __init__(self, task, micro_tasks):
        self.task = task
        self.micro_tasks = micro_tasks 
        self.created_at = datetime.utcnow()

    def to_dict(self):
        return{
            "task": self.task,
            "micro_tasks": self.micro_tasks,
            "created_at": self.created_at 
        }
    
    @staticmethod
    def from_dict(data):
        return{
            "id": str(data.get("_id", "")),
            "task": data.get("task"),
            "micro_tasks": data.get("micro_tasks"),
            "created_at": data.get("created_at")
        }

    

