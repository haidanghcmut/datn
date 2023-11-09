from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Request
from fastapi.templating import Jinja2Templates
from jinja2 import Environment, FileSystemLoader
import settings
import utils
import numpy as np
import cv2
import uvicorn
import predictions as pred
import database
from pydantic import BaseModel
from typing import Annotated
import models
from security import generate_token, validate_token
from sqlalchemy.orm import Session

# docscan = utils.DocumentScan()
app = FastAPI()
template = Jinja2Templates(directory='templates')
# app.secret_key = 'scanapp'

@app.get('/')
def home(request: Request):
    return {"message": "Hello World"}

class UserBase(BaseModel):
    username: str
    email: str

@app.post('/signup')
def signup(user: models.User):
    try:
        if any(field is None for field in [user.email, user.username, user.password]):
            raise HTTPException(status_code=400, detail="Information don't enough!")
        userDb = database.getOne({"email": user.email})
        if userDb is None:
            id = database.create(user)
            if id is None:
                raise HTTPException(status_code=400, detail="Sign Up don't succeed!")
            user = database.getOne({"_id": id})
            token = generate_token(user['email'])
            return {
                "user": user,
                "token": token
            }
        raise HTTPException(status_code=400, detail="User have exist")
    except ValueError as err:
        raise HTTPException(status_code=500, detail=err)

def verify(user: models.User, userDb: models.User):
    if userDb is None:
        return ["User not found!", False]
    if user.email != userDb.get('email'):
        return ["Wrong email!", False]
    elif user.password != userDb.get('password'):
        return ["Wrong password!", False]
    return ["", True]


@app.post('/signin')
def signin(user: models.User):
    try:
        userDb = database.getOne({"email": user.email})
        check = verify(user, userDb)
        if check[1] == True:
            token = generate_token(user.email)
            return {
                "user": userDb,
                "token": token
            }
        raise HTTPException(status_code=400, detail=check[0])
    except ValueError as err:
        raise HTTPException(status_code=500, detail=err)

@app.get("/")
def index():
    return {"message": "Welcome"}

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)