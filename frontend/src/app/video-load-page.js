import React from "react";
import VideoInput from "./VideoInput";


export default function App() {
  return (
    <div className="App">
      <h1>Video upload</h1>
      <VideoInput width={400} height={300} />
    </div>
  );
}