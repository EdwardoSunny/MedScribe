import React from "react";
import { Circles } from 'react-loading-icons'

const paragraphStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
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
    <div style={paragraphStyle}>      
      {uploaded && source ? (
        <>
        <video
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
        className="rounded-lg"
        type="file"
        onChange={handleFileChange}
        accept=".mp4"
      />
      <div className="VideoInput_footer">{prompt()}</div>

</>
      )}
    </div>
  );
}
