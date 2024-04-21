from fastapi import FastAPI, Form
from pydantic import BaseModel
from rag.rag_utils import ChatBot
import requests
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
c = ChatBot("transcript_1.txt")

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

class ChatInput(BaseModel):
    message: str

@app.post("/chat/")
async def generate_response(chat_input: ChatInput):
    response = c.get_response(chat_input.message)
    return {"message": response}


if __name__  == '__main__':
     uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
