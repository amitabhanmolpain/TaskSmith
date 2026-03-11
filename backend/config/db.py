import os

from pymongo import MongoClient
from dotenv import load_dotenv


load_dotenv()


MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "tasksmith")
MONGO_COLLECTION_NAME = os.getenv("MONGO_COLLECTION_NAME", "tasks")

client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]
tasks_collection = db[MONGO_COLLECTION_NAME]
