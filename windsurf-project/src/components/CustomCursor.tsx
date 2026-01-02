"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorState = "default" | "text" | "button";

interface ButtonTarget {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonTarget, setButtonTarget] = useState<ButtonTarget | null>(null);
  const currentButtonRef = useRef<HTMLElement | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 400, mass: 0.3 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 400, mass: 0.3 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!currentButtonRef.current) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleButtonEnter = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      currentButtonRef.current = el;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const br = parseInt(style.borderRadius) || 16;
      
      setButtonTarget({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width + 16,
        height: rect.height + 12,
        borderRadius: br + 6,
      });
      setCursorState("button");
      mouseX.set(rect.left + rect.width / 2);
      mouseY.set(rect.top + rect.height / 2);
    };

    const handleButtonLeave = () => {
      currentButtonRef.current = null;
      setButtonTarget(null);
      setCursorState("default");
    };

    const handleTextEnter = () => {
      if (!currentButtonRef.current) {
        setCursorState("text");
      }
    };

    const handleTextLeave = () => {
      if (!currentButtonRef.current && cursorState === "text") {
        setCursorState("default");
      }
    };

    const setupListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .hoverable').forEach((el) => {
        el.addEventListener("mouseenter", handleButtonEnter as EventListener);
        el.addEventListener("mouseleave", handleButtonLeave);
      });

      document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li').forEach((el) => {
        el.addEventListener("mouseenter", handleTextEnter);
        el.addEventListener("mouseleave", handleTextLeave);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    
    setupListeners();
    const observer = new MutationObserver(setupListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [isVisible, cursorState, mouseX, mouseY]);

  const getSize = () => {
    if (cursorState === "button" && buttonTarget) {
      return { w: buttonTarget.width, h: buttonTarget.height, r: buttonTarget.borderRadius };
    }
    if (cursorState === "text") {
      return { w: 3, h: 28, r: 2 };
    }
    return { w: 20, h: 20, r: 10 };
  };

  const size = getSize();

  return (
    <>
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: size.w,
          height: size.h,
          borderRadius: size.r,
          scale: isClicking ? 0.92 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400, mass: 0.3 }}
        className="fixed pointer-events-none z-[9999]"
      >
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundColor: cursorState === "button" 
              ? "rgba(74, 222, 128, 0.12)" 
              : "rgba(74, 222, 128, 0.9)",
          }}
          style={{
            borderRadius: "inherit",
            boxShadow: cursorState === "button"
              ? "inset 0 0 0 2px rgba(74, 222, 128, 0.6), 0 0 20px rgba(74, 222, 128, 0.25)"
              : "0 0 12px rgba(74, 222, 128, 0.6)",
          }}
        />
      </motion.div>

      <style jsx global>{`
        @media (min-width: 769px) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
