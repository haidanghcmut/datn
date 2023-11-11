
# from pymongo.mongo_client import MongoClient

# uri = "mongodb+srv://admin:<password>@cluster0.yrwgkwi.mongodb.net/?retryWrites=true&w=majority"

# # Create a new client and connect to the server
# client = MongoClient(uri)

# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

from pymongo import MongoClient

client = MongoClient("mongodb+srv://admin:admin@cluster0.yrwgkwi.mongodb.net/?retryWrites=true&w=majority")

db = client.todo_db

collection_name = db["user_datn"]

def create(data):
    data = dict(data)
    res = collection_name.insert_one(data)
    return res.inserted_id

def getOne(condition):
    res = collection_name.find_one(condition)
    if res is None:
        return None
    res["_id"] = str(res["_id"])
    return res