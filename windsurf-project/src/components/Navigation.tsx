"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Github, Instagram } from "lucide-react";

const navItems = [
  { name: "home", href: "#home" },
  { name: "about", href: "#about" },
  { name: "projects", href: "#projects" },
  { name: "robotics", href: "#robotics" },
  { name: "contact", href: "#contact" },
];

const socialLinks = [
  { icon: Mail, href: "mailto:rishithchennupati@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/Cyntax1", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/risheeeeth/", label: "Instagram" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl transition-all duration-500 ${
        scrolled 
          ? "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]" 
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-8">
        <motion.a
          href="#home"
          className="text-lg font-medium text-white/90 hover:text-white transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          rishith c.
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm text-white/60 hover:text-white transition-colors lowercase"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.1, color: "#4ade80" }}
              className="text-white/60 hover:text-white transition-colors"
              aria-label={link.label}
            >
              <link.icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
