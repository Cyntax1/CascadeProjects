"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const pixelArt = `
    ██████████████████████████████████████████
    ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██
    ██░░████████████████████████████████░░░░██
    ██░░██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██░░░░██
    ██░░██▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓██░░░░██
    ██░░██▓▓▒▒░░░░░░░░░░░░░░░░░░▒▒▓▓██░░░░██
    ██░░██▓▓▒▒░░  ████  ████  ░░▒▒▓▓██░░░░██
    ██░░██▓▓▒▒░░  ████  ████  ░░▒▒▓▓██░░░░██
    ██░░██▓▓▒▒░░░░░░░░░░░░░░░░░░▒▒▓▓██░░░░██
    ██░░██▓▓▒▒░░░░░░████░░░░░░░░▒▒▓▓██░░░░██
    ██░░██▓▓▒▒░░░░████████░░░░░░▒▒▓▓██░░░░██
    ██░░██▓▓▒▒▒▒░░░░░░░░░░░░░░▒▒▒▒▓▓██░░░░██
    ██░░██▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓██░░░░██
    ██░░████████████████████████████████░░░░██
    ██░░░░░░░░██████████████████░░░░░░░░░░░░██
    ██░░░░░░██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██░░░░░░░░░░██
    ██░░░░██▓▓████████████████████▓▓██░░░░░░██
    ██░░██▓▓██░░░░░░░░░░░░░░░░░░░░██▓▓██░░░░██
    ██░░██▓▓██░░████████████████░░██▓▓██░░░░██
    ██░░░░██▓▓██░░░░░░░░░░░░░░░░██▓▓██░░░░░░██
    ██░░░░░░██▓▓████████████████▓▓██░░░░░░░░██
    ██░░░░░░░░██████████████████████░░░░░░░░██
    ██████████████████████████████████████████
`;

const characters = "░▒▓█";

export default function AsciiPortrait() {
  const [displayArt, setDisplayArt] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const lines = pixelArt.split("\n");
    const totalChars = pixelArt.length;

    const interval = setInterval(() => {
      if (currentIndex <= totalChars) {
        setDisplayArt(pixelArt.slice(0, currentIndex));
        currentIndex += 15;
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isHovered) return;

    const glitchInterval = setInterval(() => {
      setDisplayArt((prev) => {
        return prev
          .split("")
          .map((char) => {
            if (characters.includes(char) && Math.random() > 0.9) {
              return characters[Math.floor(Math.random() * characters.length)];
            }
            return char;
          })
          .join("");
      });
    }, 50);

    return () => clearInterval(glitchInterval);
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setDisplayArt(pixelArt);
      }}
    >
      <pre
        className="text-[8px] sm:text-[10px] md:text-xs leading-[0.8] font-mono select-none transition-all duration-300"
        style={{
          color: isHovered ? "#22d3ee" : "#4ade80",
          textShadow: isHovered
            ? "0 0 20px rgba(34, 211, 238, 0.5)"
            : "0 0 20px rgba(74, 222, 128, 0.3)",
        }}
      >
        {displayArt}
      </pre>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}
