"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Pixel {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const colors = ["#4ade80", "#22d3ee", "#a855f7", "#f472b6", "#fbbf24"];

export default function PixelTrail() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [isActive, setIsActive] = useState(true);

  const addPixel = useCallback((e: MouseEvent) => {
    if (!isActive) return;
    
    const newPixel: Pixel = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 4,
    };

    setPixels((prev) => [...prev.slice(-20), newPixel]);
  }, [isActive]);

  useEffect(() => {
    let lastTime = 0;
    const throttledHandler = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 50) {
        addPixel(e);
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", throttledHandler);
    return () => window.removeEventListener("mousemove", throttledHandler);
  }, [addPixel]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPixels((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {pixels.map((pixel) => (
          <motion.div
            key={pixel.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: pixel.y + 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              left: pixel.x - pixel.size / 2,
              top: pixel.y - pixel.size / 2,
              width: pixel.size,
              height: pixel.size,
              backgroundColor: pixel.color,
              boxShadow: `0 0 ${pixel.size * 2}px ${pixel.color}`,
            }}
            className="rounded-sm"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
