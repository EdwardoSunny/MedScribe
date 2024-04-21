import React from "react";
import { Circles } from 'react-loading-icons'

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();
  const [uploaded, setUploaded] = React.useState(false); // new state variable
   

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);

      const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://localhost:8000/upload-video", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
        setUploaded(true);
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }

  };

  function prompt(){
    if(uploaded && source) return "Great! Navigate to the summary page to review the important points of your visit or the chat page for any questions.";
    if (!uploaded && source) return "Loading..."
    return "Please upload the video of your doctors visit";
  }
  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="text-xl">      
      {uploaded && source ? (
        <>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-3xl p-5 inline-block w-100 h-auto">
        <video
          className=""
          width="100%"
          height={height}
          controls
          src={source}
        />
      <div className="font-bold">{prompt()}</div>
      </div>
        </>
      ) : !uploaded && source ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-5 inline-block">
        <Circles />
        </div>
      ) : (
        <>
  {/* <input
        ref={inputRef}
        className="rounded-lg hidden"
        type="file"
        onChange={handleFileChange}
        accept=".mp4"
      /> */}
    <div className="flex flex-col items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-3xl p-5 inline-block">
      <label className="bg-white text-black font-bold px-4 py-2 cursor-pointer rounded-lg">
          Upload File
          <input
            ref={inputRef}
            className="hidden"
            type="file"
            onChange={handleFileChange}
            accept=".mp4"
          />
        </label>
      <div className="p-5">{prompt()}</div>
</div>
</>
      )}
    </div>
  );
}
