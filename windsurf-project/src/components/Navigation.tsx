"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const navItems = [
  { name: "home", href: "#home" },
  { name: "about", href: "#about" },
  { name: "projects", href: "#projects" },
  { name: "robotics", href: "#robotics" },
  { name: "contact", href: "#contact" },
];

const socialLinks = [
  { icon: Mail, href: "mailto:hello@rishithc.com", label: "Email" },
  { icon: Github, href: "https://github.com/rishithc", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/rishithc", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/rishithc", label: "Twitter" },
];

export default function Navigation() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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
