"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Mouse } from "lucide-react";

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
    >
      {/* Mouse icon with scroll animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="relative"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 bg-[#4ade80] rounded-full"
          />
        </div>
      </motion.div>

      {/* Scroll text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-xs text-white/40 tracking-widest uppercase">scroll down</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-[#4ade80]/60" />
        </motion.div>
      </motion.div>

      {/* Glowing line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 40 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        className="w-px bg-gradient-to-b from-[#4ade80]/50 to-transparent"
      />
    </motion.div>
  );
}
