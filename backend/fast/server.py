from fastapi import FastAPI, Form
from pydantic import BaseModel
from rag.rag_utils import ChatBot
import requests
import os
import uvicorn
from audio.mp4_to_mp3 import convert_mp4_to_mp3
from audio.mp3_to_transcript import get_transcript
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil

app = FastAPI()
global chat_initalized, image_uploaded 
chat_initalized = False
image_uploaded = False
DATA_PATH = os.path.dirname("../data/")
c = "" 

class ChatInput(BaseModel):
    message: str

class ChatInput(BaseModel):
    message: str

# Add CORS to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/chat-initialized/")
async def get_chat_initialized():
    trans_path = os.path.join(DATA_PATH, "transcript_1.txt") #saves vid file
    return {"data": os.path.exists(trans_path)}

@app.post("/chat/")
async def generate_response(chat_input: ChatInput):
    global c
    response = ""
    if (image_uploaded and type(c) != str):
        response = c.get_response(chat_input.message, img_path=os.path.join(DATA_PATH, "img_1.jpg"))
    elif (type(c) != str):
        response = c.get_response(chat_input.message)
    return {"message": response}

@app.post("/upload-video/")
async def upload_video(video: UploadFile = File(...)):
    video_path = os.path.join(DATA_PATH, "videos", "recording_1.mp4") #saves vid file
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    if os.path.exists(video_path):
        global c
        convert_mp4_to_mp3()
        get_transcript()
        print("ONE BALLS")
        if (type(c) == str):
            print("FIXED")
            c = ChatBot("transcript_1.txt")
            global chat_initalized
            chat_initalized = True
    if os.path.exists(video_path):
        return {"filename": video.filename, "status": "File saved successfully"}
    else:
        return {"filename": video.filename, "status": "Failed to save file"}

@app.post("/upload-image/")
async def upload_image(image: UploadFile = File(...)):
    image_path = os.path.join(DATA_PATH, "videos", image.filename) #saves vid file
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
	# Check if the file exists after saving
    if os.path.exists(image_path):
        image_uploaded = True
        return {"filename": image.filename, "status": "File saved successfully"}
    else:
        return {"filename": image.filename, "status": "Failed to save file"}


@app.get("/summary/")
async def summary():
    global c
    print(type(c))
    if (type(c) != str):
        return {"summary": c.get_response("Summarize my most recent doctor's visit in bullet points, make sure to put returns in the right locations. I am the patient.")}
    else:
        return {"summary": ""}

if __name__  == '__main__':
     uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
