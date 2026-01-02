"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecretFooter() {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5) {
      setShowSecret(true);
      setClickCount(0);
      setTimeout(() => setShowSecret(false), 3000);
    }
  };

  return (
    <>
      <span 
        onClick={handleClick}
        className="cursor-default select-none"
      >
        💚
      </span>
      
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-xl border border-[#4ade80]/30"
          >
            <p className="text-sm text-[#4ade80]">
              🎉 you found another secret! you're curious, i like that.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
