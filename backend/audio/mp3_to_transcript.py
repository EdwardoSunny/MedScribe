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
  timestamp_granularities=["word"]
)

audio_file.close();


# Extracting words from the transcript and joining them into a single string
transcript_words = [word_info['word'] for word_info in transcript.words]
transcript_text = " ".join(transcript_words)


#write out to transcript.txt
with open("/Users/maanasgantla/Desktop/LAHacks2024/backend/data/transcript.txt", "w") as file:
    file.write(transcript_text)



#print(transcript_text)



'''
for word_info in transcript.words:
    print(word_info['word'])
'''
