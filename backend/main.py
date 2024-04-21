from fastapi import FastAPI, File, UploadFile
from tempfile import NamedTemporaryFile
import os

@app.post("/video/detect-faces")