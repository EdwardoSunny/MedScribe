"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./hero-highlight";
import Image from 'next/image'
import Logo from "../assets/logo.png"

export function Hero() {
  return (
    <div className="flex items-center justify-center">
      <HeroHighlight>
      <div className="flex items-center justify-center w-full">
        <Image
          src={Logo}
          alt="Hero"
          layout="fixed"
          width={300}
          height={300}
        />
      </div>

        <h1 className="text-4xl px-4 md:text-6xl lg:text-8xl font-bold md:py-6 italic">
          MedScribe.
        </h1>
      
      
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-4xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          an{" "}
          <Highlight className="text-black dark:text-white">
            AI powered assistant
          </Highlight>{" "}
          for your doctor visits.
        </motion.h1>
      </HeroHighlight>

    </div>
  );
}
