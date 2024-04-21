import os
from moviepy.editor import *

try:
    # Load the mp4 file
    video = VideoFileClip("/Users/maanasgantla/Desktop/LAHacks2024/backend/data/westernMichiganDoctorAppointment.mp4")
    
    # Extract audio from video
    video.audio.write_audiofile("/Users/maanasgantla/Desktop/LAHacks2024/backend/data/westernMichiganDoctorAppointment.mp3")
    
    print("Audio extraction successful.")
    
except FileNotFoundError:
    print("Error: The video file does not exist.")
    
except IOError:
    print("Error: Unable to read or write the files.")
    
except Exception as e:
    prin