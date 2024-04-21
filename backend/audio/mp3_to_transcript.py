import os
import json
from openai import OpenAI

os.environ["OPENAI_API_KEY"] #set up OpenAI API key

DATA_PATH = os.path.dirname("../data/")

client = OpenAI()

def get_transcript():
  # Load the audio file
    
  # Create a transcript of the audio file transcript

  audio_file = open(os.path.join(DATA_PATH, "audio", "recording_1.mp3"), "rb")
  transcript = client.audio.transcriptions.create(
    file=audio_file,
    model="whisper-1",
    response_format="verbose_json",
    timestamp_granularities=["word"]
  )

  audio_file.close();

  # Extracting words from the transcript and joining them into a single string
  transcript_words = [word_info['word'] for word_info in transcript.words]
  transcript_text = " ".join(transcript_words)
  print("TRANS GAY")
  #write out to transcript.txt
  with open(os.path.join(DATA_PATH, "transcript_1.txt"), "w") as file:
    file.write(transcript_text)
    file.close()