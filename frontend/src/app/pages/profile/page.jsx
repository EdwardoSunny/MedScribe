"use client";
import React from "react";
import VideoInput from "../../components/video-upload";
import { NavbarWrapper } from "../../components/navbar-wrapper";
import { BackgroundGradientAnimation } from "../../components/background-gradient-animation";

export default function Profile() {
  return (
    <>
      <NavbarWrapper />
      <BackgroundGradientAnimation />
      <div className="App">
        <h1>Video upload</h1>
        <VideoInput  />
      </div>
    </>
  );
}
