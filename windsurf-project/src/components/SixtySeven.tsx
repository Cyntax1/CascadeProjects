"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function SixtySeven() {
  const [sequence, setSequence] = useState("");
  const [triggered, setTriggered] = useState(false);
  const [showMeme, setShowMeme] = useState(false);

  const trigger67 = useCallback(() => {
    setTriggered(true);
    setShowMeme(true);

    // Epic confetti explosion
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 67,
        origin: { x: 0, y: 0.67 },
        colors: ["#4ade80", "#22d3ee", "#fbbf24", "#f472b6"],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 67,
        origin: { x: 1, y: 0.67 },
        colors: ["#4ade80", "#22d3ee", "#fbbf24", "#f472b6"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => setShowMeme(false), 5000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "6" || key === "7") {
        const newSeq = (sequence + key).slice(-2);
        setSequence(newSeq);
        
        if (newSeq === "67") {
          trigger67();
          setSequence("");
        }
      } else {
        setSequence("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence, trigger67]);

  return (
    <AnimatePresence>
      {showMeme && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="relative"
          >
            {/* Giant 67 */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.5,
              }}
              className="text-[200px] md:text-[300px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] via-[#22d3ee] to-[#a855f7]"
              style={{
                textShadow: "0 0 60px rgba(74, 222, 128, 0.5), 0 0 120px rgba(34, 211, 238, 0.3)",
                WebkitTextStroke: "4px rgba(255,255,255,0.2)",
              }}
            >
              67
            </motion.div>

            {/* Floating emojis */}
            {["🔥", "💀", "😭", "🗿", "💯", "🐐"].map((emoji, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: Math.cos(i * 60 * Math.PI / 180) * 200,
                  y: Math.sin(i * 60 * Math.PI / 180) * 200,
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
                className="absolute top-1/2 left-1/2 text-5xl"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {emoji}
              </motion.div>
            ))}

            {/* Meme text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-2xl font-bold text-white whitespace-nowrap"
            >
              nice. 😏
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 15 }}
        className="fixed bottom-4 left-4 z-40"
      >
        <motion.p
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-[10px] text-white/20 font-mono"
        >
          67
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
