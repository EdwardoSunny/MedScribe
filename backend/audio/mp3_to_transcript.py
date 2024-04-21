import os
import json
from openai import OpenAI

os.environ["OPENAI_API_KEY"] #set up OpenAI API key

client = OpenAI()

audio_file = open("/Users/maanasgantla/Desktop/LAHacks2024/backend/data/westernMichiganDoctorAppointment.mp3", "rb")
transcript = client.audio.transcriptions.create(
  file=audio_file,
  model="whisper-1",
  response_format="verbose_json",
  timestam