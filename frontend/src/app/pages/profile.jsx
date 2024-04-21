import React from "react";
import VideoInput from "../components/video-upload";

export default function Profile() {
  return (
    <div className="App">
      <h1>Video upload</h1>
      <VideoInput width={400} height={300} />
    </div>
  );
}
