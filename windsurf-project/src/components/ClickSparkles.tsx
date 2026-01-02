"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

export default function ClickSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSparkle: Sparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setSparkles((prev) => [...prev, newSparkle]);
      
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            style={{
              position: "absolute",
              left: sparkle.x,
              top: sparkle.y,
            }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: Math.cos((i * Math.PI) / 4) * 40,
                  y: Math.sin((i * Math.PI) / 4) * 40,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: i % 2 === 0 ? "#4ade80" : "#22d3ee",
                  boxShadow: `0 0 6px ${i % 2 === 0 ? "#4ade80" : "#22d3ee"}`,
                }}
              />
            ))}
            <motion.div
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={{ duration: 0.4 }}
              className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30"
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
