"use client";

import Image from "next/image";
import LaptopDemo from "./components/laptop-demo";
import { NavbarWrapper } from "./components/navbar-wrapper";
import { Hero } from "./components/hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/profile";
import LandingPage from "./pages/landingpage";
import Chat from "./pages/chat";
import Summary from "./pages/summary";

export default function Home() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </>
  );
}
