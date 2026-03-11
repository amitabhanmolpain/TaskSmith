from dotenv import load_dotenv

load_dotenv()

from flask import Flask
from routes.task_routes import task_routes

app = Flask(__name__)

app.register_blueprint(task_routes)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return response

@app.route("/")
def home():
    return {"message": "TaskSmith Backend  Running"}


if __name__ == "__main__":
    app.run(debug=True)