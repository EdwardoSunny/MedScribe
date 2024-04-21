import sys
sys.path.insert(1, '../')
from fastapi import FastAPI, Form
from pydantic import BaseModel
from rag.rag_utils.py import ChatBot
import requests

app = FastAPI()

class ChatInput(BaseModel):
    message: str


@app.post("/chat/")
async def generate_response(chat_input: ChatInput):
	c = ChatBot("transcript_1.txt")
	response = c.get_response(chat_input.message)
        return {"message": response.choices[0].text.strip()}
