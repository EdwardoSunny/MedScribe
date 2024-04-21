from fastapi import FastAPI, File, UploadFile
from tempfile import NamedTemporaryFile
import os

@app.post("/video/upload-video")
def upload_video(file: UploadFile = File(...)):
    temp = NamedTemporaryFile(delete=False)
    try:
        try:
            contents = file.file.read()
            with temp as f:
                f.write(contents);
        except Exception:
            return {"message": "There was an error uploading the file"}
        finally:
            file.file.close()
        
        res = process_video(temp.name)  # Pass temp.name to VideoCapture()
    except Exception:
        return {"message": "There was an error processing the file"}
    finally:
        #temp.close()  # the `with` statement above takes care of closing the file
        os.remove(temp.name)
        
    return res