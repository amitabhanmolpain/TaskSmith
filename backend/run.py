from flask import Flask
from routes.task_routes import task_routes
from dotenv import load_dotenv 

app = Flask(__name__)

app.register_blueprint(task_routes)

load_dotenv()

@app.route("/")
def home():
    return {"message": "TaskSmith Backend  Running"}


if __name__ == "__main__":
    app.run(debug=True)