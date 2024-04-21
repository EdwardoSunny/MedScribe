import React from "react";
import { Circles } from 'react-loading-icons'
const paragraphStyle = {
  position: 'fixed',
  top: '50%',
  left: '20%',
  transform: 'translate(-50%, -50%)', 
};

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
    if(uploaded && source) return "Success!";
    if (!uploaded && source) return "Loading..."
    return "Upload any relevant pictures";
  }
  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div style={paragraphStyle}>
      
     


      {uploaded && source ? (
        <>
        <img
          className="rounded-xl"
          width="100%"
          height={height}
          controls
          src={source}
        />
      <div className="VideoInput_footer">{prompt()}</div>
        </>
      ) : !uploaded && source ? (
        <Circles />
      ) : (
        <>
  <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".jpg"
      />
      <div className="VideoInput_footer">{prompt()}</div>

</>
      )}


    </div>
  );
}

