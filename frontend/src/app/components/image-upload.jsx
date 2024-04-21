import React from "react";
import { Circles } from 'react-loading-icons'
const paragraphStyle = {
  position: 'fixed',
  top: '50%',
  left: '25%',
  transform: 'translate(-50%, -50%)', 
};

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);

      const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/upload-image", {
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
    if(source)return "Success! Ask questions about your image or your lasts doctors visit";
    return "upload any relevant images or start chatting";
  }
  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
      <div className="text-xl flex flex-col items-center justify-center h-screen">      
      {source ? (
        <>
        <div className="flex flex-col items-center justify-center ">
        <img
          className="w-1/2 h-auto rounded-xl"
          height={height}
          controls
          src={source}
        />
      <div className="font-bold p-10">{prompt()}</div>
      </div>
        </>
      ) : (
        <>
    <div className="flex flex-col items-center justify-center">
      <label className="bg-white text-black font-bold px-4 py-2 cursor-pointer rounded-lg">
          Upload File
          <input
            ref={inputRef}
            className="hidden"
            type="file"
            onChange={handleFileChange}
            accept=".jpg"
          />
        </label>
      <div className="p-5">{prompt()}</div>
</div>
</>
      )}
    </div>
        );
}
      