from pymongo import MongoClient
from decouple import config

DB_URI = config("DB_URI", default="mongodb://root:example@localhost:27017")

client = MongoClient(DB_URI)
db = client.avioes_na_web

def create_airplane(data):
    db.airplanes.insert_one(data)