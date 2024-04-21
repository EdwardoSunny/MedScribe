from fastapi import FastAPI, File, UploadFile
import shutil

app = FastAPI()

@app.post("/upload-video")
async def upload_video(video: UploadFile = File(...)):
    video_path = f"./videos/{video.filename}" #saves vid file
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)
  

	# Check if the file exists after saving
    if os.path.exists(video_path):
        return {"filename": video.filename, "status": "File saved successfully"}
    else:
        return {"filename": video.filename, "status": "Failed to save file"}

     
 #return {"filename": video.filename}
