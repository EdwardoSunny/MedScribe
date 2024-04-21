import os
from moviepy.editor import *

DATA_PATH = os.path.dirname("../data/")

def convert_mp4_to_mp3():
    try:
        # Load the mp4 file
        video = VideoFileClip(os.path.join(DATA_PATH, "videos", "recording_1.mp4"))
        
        # Extract audio from video
        video.audio.write_audiofile(os.path.join(DATA_PATH, "audio", "recording_1.mp3"))
        
        print("Audio extraction successful.")
        
    except FileNotFoundError:
        print("Error: The video file does not exist.")
        
    except IOError:
        print("Error: Unable to read or write the files.")
        
    except Exception as e:
        print("An unexpected error occurred:", e)

