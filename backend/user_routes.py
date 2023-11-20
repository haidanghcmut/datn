from fastapi import APIRouter, Depends, HTTPException, status
from user_models import User
from database import collection_name
from user_schema import invidiual_serial, list_serial
from bson import ObjectId

user_router = APIRouter()

@user_router.get('/users')
async def get_users():
    users = list_serial(collection_name.find())
    return users

# post user
@user_router.post("/")
async def create_user(user: User): 
   _id = collection_name.insert_one(dict(user))
   return list_serial(collection_name.find({"_id": _id.inserted_id}))
    
# Update user
@user_router.put("/{id}")
async def update_user(id: str, user: User):
    collection_name.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(user)})
    return list_serial(collection_name.find({"_id": ObjectId(id)}))
# delete user
@user_router.delete("/{id}")
async def delete_user(id: str):
    collection_name.find_one_and_delete({"_id": ObjectId(id)})
    return {"message": "Delete successfully!"}

