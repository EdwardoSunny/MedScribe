"use client";
import React from "react";
import Summary from "../../components/summary";
import { NavbarWrapper } from "../../components/navbar-wrapper";
import { BackgroundGradientAnimation } from "../../components/background-gradient-animation";

export default function Profile() {
  return (
    <>
      <NavbarWrapper />
      <BackgroundGradientAnimation />
      <Summary />
    </>
  );
}

