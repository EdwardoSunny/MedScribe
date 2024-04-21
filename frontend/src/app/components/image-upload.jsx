import React from "react";
const paragraphStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-110%, -50%)',
};
export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div style={paragraphStyle}>
  
      <input
        ref={inputRef}
        
        type="file"
        onChange={handleFileChange}
        accept=".jpeg,.png"
      />
      
      {source && (
        <image
          className="VideoInput_video"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
      <div className="VideoInput_footer">{source || "Nothing selected"}</div>
    </div>
  );
}
