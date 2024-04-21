"use client";

import Image from "next/image";
import LaptopDemo from "./components/laptop-demo";
import { NavbarWrapper } from "./components/navbar-wrapper";
import { Hero } from "./components/hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/profile";
import LandingPage from "./pages/landingpage";

export default function Home() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}
