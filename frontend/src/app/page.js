"use client";

import Image from "next/image";
import LaptopDemo from "./components/laptop-demo";
import { NavbarWrapper } from "./components/navbar-wrapper";
import { Hero } from "./components/hero";

export default function Home() {
  return (
    <>
      <NavbarWrapper />
      <Hero />
      <LaptopDemo />
    </>
  );
}
