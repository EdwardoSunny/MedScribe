"use client";
import React from "react";
import VideoInput from "../../components/video-upload";
import { NavbarWrapper } from "../../components/navbar-wrapper";

export default function Profile() {
  return (
    <>
      <NavbarWrapper />
      <div className="App">
        <h1>Video upload</h1>
        <VideoInput width={400} height={300} />
      </div>
    </>
  );
}
