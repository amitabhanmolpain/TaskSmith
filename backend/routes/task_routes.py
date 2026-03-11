from flask  import Blueprint 
from controllers.task_controller import create_task, get_tasks

task_routes = Blueprint("task_routes", __name__)

task_routes.route("/generate-tasks", methods=["POST"])(create_task)


task_routes.route("/tasks", methods=["GET"])(get_tasks)