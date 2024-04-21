import React from "react";
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
    if(source) return "Great! Navigate to the summary page to review the important points of your visit or the chat page for any questions.";
    return "Please upload the video of your doctors visit";
  }
  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div style={paragraphStyle}>
  
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mp4"
      />
      
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
      <div className="VideoInput_footer">{prompt()}</div>
    </div>
  );
}
