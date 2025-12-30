"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
        relative overflow-hidden rounded-3xl p-6
        bg-white/[0.02] backdrop-blur-xl
        border border-white/[0.05]
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        before:absolute before:inset-0 before:rounded-3xl
        before:bg-gradient-to-br before:from-white/[0.08] before:to-transparent
        before:pointer-events-none
        after:absolute after:inset-0 after:rounded-3xl
        after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
        after:pointer-events-none
        transition-all duration-500
        hover:border-[rgba(74,222,128,0.3)]
        hover:shadow-[0_8px_60px_rgba(74,222,128,0.15),0_0_40px_rgba(34,211,238,0.1)]
        ripple glow-outline
        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
