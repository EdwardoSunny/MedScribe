import os
from openai import OpenAI

os.environ["OPENAI_API_KEY"]

client = OpenAI()

audio_file = open("/Users/maanasgantla/Desktop/LAHacks2024/backend/data/maanasTestWorks.mp3", "rb")
transcript = client.audio.transcriptions.create(
  file=audio_file,
  model="whisper-1",
  response_format="verbose_json",
  timestamp_granularities=["word"]
)

print(transcript.words)
