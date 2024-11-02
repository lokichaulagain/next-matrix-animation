"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+";

interface FallingCharacterProps {
  char: string;
  delay: number;
}

const FallingCharacter: React.FC<FallingCharacterProps> = ({ char, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: [0, 1, 0], y: 20 }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: delay,
      }}
      className="text-green-400 text-xl font-mono">
      {char}
    </motion.div>
  );
};

export default function MatrixAnimation() {
  const [matrixChars, setMatrixChars] = useState<{ char: string; delay: number }[]>([]);

  useEffect(() => {
    const cols = Math.floor(window.innerWidth / 20);
    const rows = Math.floor(window.innerHeight / 20);
    const totalChars = cols * rows;

    const newMatrixChars = Array.from({ length: totalChars }, () => ({
      char: characters[Math.floor(Math.random() * characters.length)],
      delay: Math.random() * 2,
    }));

    setMatrixChars(newMatrixChars);
    console.log("console it")
  }, []);

  return (
    <div className="bg-black h-screen overflow-hidden relative">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-0">
        {matrixChars.map((char, index) => (
          <FallingCharacter
            key={index}
            char={char.char}
            delay={char.delay}
          />
        ))}
      </div>
    </div>
  );
}
