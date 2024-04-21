"use client";
import React from "react";
import { ReactTyped } from "react-typed";
import { MacbookScroll } from "./macbook-scroll";

export default function LaptopDemo() {
  return (
    <>
      <MacbookScroll
        title={
          <span>
            No more long waits for simple questions.
            <br />
            <i>
              "
              <ReactTyped
                strings={[
                  "My arm is sore, why?",
                  "What should I avoid eating?",
                  "How many days until I can play sports again?",
                ]}
                typeSpeed={120}
                backSpeed={140}
                loop
              />
              "
            </i>
          </span>
        }
        showGradient={false}
      />
    </>
  );
}
