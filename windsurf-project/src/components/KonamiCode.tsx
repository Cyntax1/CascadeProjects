"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

const secrets = [
  "🎮 konami code activated!",
  "✨ you found the secret!",
  "🚀 developer mode: ON",
  "💚 thanks for exploring!",
];

export default function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [secretIndex, setSecretIndex] = useState(0);
  const [matrixMode, setMatrixMode] = useState(false);

  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#4ade80", "#22d3ee", "#a855f7"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#4ade80", "#22d3ee", "#a855f7"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.code].slice(-10);
      setSequence(newSequence);

      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        setActivated(true);
        setShowMessage(true);
        setSecretIndex((prev) => (prev + 1) % secrets.length);
        triggerConfetti();
        
        // Toggle matrix mode on second activation
        if (activated) {
          setMatrixMode((prev) => !prev);
        }

        setTimeout(() => setShowMessage(false), 3000);
        setSequence([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence, activated, triggerConfetti]);

  return (
    <>
      {/* Secret message popup */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] px-8 py-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-[#4ade80]/30"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-medium text-[#4ade80] text-center"
            >
              {secrets[secretIndex]}
            </motion.p>
            {activated && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-white/50 text-center mt-2"
              >
                try it again for matrix mode 👀
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix rain effect */}
      {matrixMode && <MatrixRain />}

      {/* Hint for konami code */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 10 }}
        className="fixed bottom-4 right-4 z-40"
      >
        <motion.p
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-[10px] text-white/20 font-mono"
        >
          ↑↑↓↓←→←→BA
        </motion.p>
      </motion.div>
    </>
  );
}

function MatrixRain() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const cols = Math.floor(window.innerWidth / 20);
    setColumns(Array.from({ length: cols }, () => Math.random() * -100));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden opacity-30">
      {columns.map((startY, i) => (
        <motion.div
          key={i}
          initial={{ y: startY }}
          animate={{ y: window.innerHeight + 100 }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: i * 20 }}
          className="absolute text-[#4ade80] font-mono text-sm"
        >
          {Array.from({ length: 20 }, () => 
            String.fromCharCode(0x30A0 + Math.random() * 96)
          ).join("\n")}
        </motion.div>
      ))}
    </div>
  );
}
