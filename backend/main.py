from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Request
from fastapi.templating import Jinja2Templates
from jinja2 import Environment, FileSystemLoader
import model.settings
import model.utils
import numpy as np
import cv2
import uvicorn
import model.predictions as pred
import database
import user_models
from pydantic import BaseModel
from auth import generate_token, validate_token
from user_routes import user_router
from fastapi.middleware.cors import CORSMiddleware
import spacy
from fastapi.responses import JSONResponse
import numpy as np
from io import BytesIO
from PIL import Image
import pytesseract
import base64

# docscan = utils.DocumentScan()
app = FastAPI(title='FastAPI JWT', openapi_url='/openapi.json', docs_url='/docs', description='fastapi jwt')
app.include_router(user_router)
model_ner = spacy.load('./output/model-best/')
# app.secret_key = 'scanapp'

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/predictions/')
async def predictions(file: UploadFile = File(...)):
    try:
      contents = await file.read()
      image = cv2.imdecode(np.frombuffer(contents, np.uint8), -1)
      img_bb, entities = pred.getPredictions(image)
       # Chuyển đổi ảnh thành định dạng base64 để trả về
      _, img_encoded = cv2.imencode('.jpeg', img_bb)
      img_base64 = base64.b64encode(img_encoded).decode('utf-8')
      return JSONResponse(content={"entities": entities})
    except ValueError as err:
        raise HTTPException(status_code=500, detail=err)

@app.get('/')
def home(request: Request):
    return {"message": "Hello DATN"}

@app.post('/signup/')
def signup(user: user_models.User):
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

def verify(user: user_models.User, userDb: user_models.User):
    if userDb is None:
        return ["User not found!", False]
    if user.email != userDb.get('email'):
        return ["Wrong email!", False]
    elif user.password != userDb.get('password'):
        return ["Wrong password!", False]
    elif user.username != userDb.get('username'):
        return ["Wrong username!", False]
    return ["", True]


@app.post('/signin/')
def signin(user: user_models.User):
    try:
        userDb = database.getOne({"email": user.email})
        check = verify(user, userDb)
        if check[1] is True:
            token = generate_token(user.email)
            return {
                "user": userDb,
                "token": token
            }
        raise HTTPException(status_code=400, detail=check[0])
    except ValueError as err:
        raise HTTPException(status_code=500, detail="Sign In don't succeed!")



if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)