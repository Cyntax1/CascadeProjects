"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowDown, Sparkles, Code, Palette, Gamepad2, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import ParticlesBackground from "@/components/ParticlesBackground";
import AsciiPortrait from "@/components/AsciiPortrait";
import TypewriterText from "@/components/TypewriterText";
import GlassCard from "@/components/GlassCard";
import ProjectCard from "@/components/ProjectCard";

const featuredProjects = [
  {
    title: "countr",
    description: "ai exercise tracker using apple vision to detect body poses and count reps in real-time, with gpt-4 custom workout creation.",
    tags: ["swiftui", "vision", "healthkit", "gpt-4"],
    github: "https://github.com/rishithc",
  },
  {
    title: "kura",
    description: "ai nutrition & fasting app that recognizes food from photos using openai vision api to calculate calories and macros.",
    tags: ["swiftui", "openai", "strava", "live activities"],
    github: "https://github.com/rishithc",
  },
  {
    title: "scriptly",
    description: "ai academic writing suite with gpt-4o autocomplete, grammar checking, and google scholar citations in apa/mla/chicago.",
    tags: ["swiftui", "openai", "swiftdata"],
    github: "https://github.com/rishithc",
  },
  {
    title: "cyntascan",
    description: "medical image analysis platform that detects cancer and fractures in x-rays and ct scans using machine learning.",
    tags: ["next.js", "tensorflow", "mongodb", "typescript"],
    github: "https://github.com/rishithc",
  },
  {
    title: "fluentry",
    description: "ai language learning app with personalized lessons, conversation practice, and 1000+ vocabulary words.",
    tags: ["swiftui", "openai", "widgetkit"],
    github: "https://github.com/rishithc",
  },
  {
    title: "aero",
    description: "flight tracker with ios 26 liquid glass design, real-time map tracking, and dynamic island live activities.",
    tags: ["swiftui", "mapkit", "live activities"],
    github: "https://github.com/rishithc",
  },
];

const moreProjects = [
  {
    title: "dawn",
    description: "smart alarm & morning routine app with enhanced wake-up experiences and personalized onboarding.",
    tags: ["swiftui", "notifications", "persistence"],
    github: "https://github.com/rishithc",
  },
  {
    title: "nimbus clock",
    description: "minimalist clock with world time zones, sleep scheduling, and comprehensive widget support.",
    tags: ["swiftui", "widgetkit", "app groups"],
    github: "https://github.com/rishithc",
  },
  {
    title: "one thing",
    description: "macos menu bar battery app with liquid glass design and beautiful popover interface.",
    tags: ["swiftui", "appkit", "macos"],
    github: "https://github.com/rishithc",
  },
  {
    title: "edume",
    description: "mobile learning platform with firebase backend, google sign-in, and offline support.",
    tags: ["swiftui", "firebase", "google auth"],
    github: "https://github.com/rishithc",
  },
];

const skills = [
  { icon: Code, name: "ios dev", description: "swiftui, vision, healthkit" },
  { icon: Sparkles, name: "ai/ml", description: "openai, tensorflow, vision" },
  { icon: Palette, name: "full-stack", description: "next.js, react, mongodb" },
  { icon: Gamepad2, name: "design", description: "liquid glass, animations" },
];

const languages = [
  { name: "swift", level: "advanced", color: "#F05138" },
  { name: "swiftui", level: "advanced", color: "#0071E3" },
  { name: "python", level: "advanced", color: "#3776AB" },
  { name: "c++", level: "intermediate", color: "#00599C" },
  { name: "typescript", level: "intermediate", color: "#3178C6" },
  { name: "java", level: "learning", color: "#ED8B00" },
];

const roboticsProjects = [
  {
    title: "coming soon",
    description: "robotics projects will be added here. stay tuned for exciting builds with c++ and hardware integration.",
    tags: ["c++", "robotics", "hardware"],
  },
];

export default function Home() {
  const [showAll, setShowAll] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0a0f1a] overflow-hidden">
      <ParticlesBackground />
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* ASCII Portrait */}
          <div className="hidden lg:flex justify-center">
            <AsciiPortrait />
          </div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white/90">
              hi, <span className="text-gradient font-medium">rishith</span> here.
              <span className="typing-cursor" />
            </h1>

            <p className="text-lg text-white/50 max-w-md leading-relaxed">
              <TypewriterText
                text="13-year-old ios developer & ai enthusiast. built 10+ apps in 8th grade. i turn ideas into pixels and code."
                delay={800}
              />
            </p>

            <motion.a
              href="mailto:hello@rishithc.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-6 py-3 mt-4 rounded-2xl glass-button text-[#4ade80] text-sm font-medium w-fit"
            >
              <Mail size={18} />
              say hi!
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white/30"
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-white/90 mb-12"
          >
            about <span className="text-gradient">me</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard hover={false}>
                <div className="flex flex-col gap-4">
                  <p className="text-white/60 leading-relaxed">
                    hey! i'm <span className="text-white/90">rishith chennupati</span>, a 13-year-old developer
                    who's been building ios apps and web platforms since middle school.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    in 8th grade alone, i built 10+ apps spanning ai/ml, computer vision, 
                    health tech, and full-stack development. from detecting cancer in x-rays
                    to counting your exercise reps with ai.
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    i love swiftui, building with ai apis, and creating apps that actually
                    help people. always learning, always shipping.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <GlassCard className="h-full">
                    <div className="flex flex-col items-center text-center gap-2">
                      <skill.icon className="text-[#4ade80]" size={24} />
                      <h3 className="text-white/80 font-medium">{skill.name}</h3>
                      <p className="text-xs text-white/40">{skill.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-white/90 mb-12"
          >
            languages i <span className="text-gradient">speak</span>
          </motion.h2>

          <div className="flex flex-wrap gap-4 justify-center">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="lang-badge px-6 py-3 rounded-2xl cursor-default glow-outline"
                style={{ 
                  borderColor: `${lang.color}40`,
                  boxShadow: `0 0 20px ${lang.color}20`
                }}
              >
                <span className="text-white/90 font-medium">{lang.name}</span>
                <span 
                  className="ml-2 text-xs px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: `${lang.color}20`,
                    color: lang.color 
                  }}
                >
                  {lang.level}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-white/90 mb-12"
          >
            my <span className="text-gradient">projects</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 overflow-hidden"
              >
                {moreProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mx-auto mt-8 flex items-center gap-2 px-6 py-3 rounded-2xl glass-button text-white/70 text-sm font-medium"
          >
            {showAll ? "show less" : "view all projects"}
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </motion.button>
        </div>
      </section>

      {/* Robotics Section */}
      <section id="robotics" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-white/90 mb-12"
          >
            robotics <span className="text-gradient">builds</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <GlassCard className="majestic-glow text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="text-4xl">🤖</div>
                <h3 className="text-xl text-white/90 font-medium">coming soon</h3>
                <p className="text-white/50 max-w-md">
                  robotics projects with c++ and hardware integration will be showcased here.
                  building cool stuff with motors, sensors, and code.
                </p>
                <div className="flex gap-2 mt-4">
                  {["c++", "robotics", "arduino", "hardware"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-white/[0.03] text-white/50 border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-white/90 mb-6"
          >
            let's <span className="text-gradient">connect</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 mb-8"
          >
            got an idea? want to collaborate? or just wanna say hi?
            my inbox is always open.
          </motion.p>

          <motion.a
            href="mailto:hello@rishithc.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-button text-[#4ade80] font-medium"
          >
            <Mail size={20} />
            drop me a message
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © 2024 rishith chennupati. made with 💚
          </p>
          <p className="text-sm text-white/30">
            rishithc.com
          </p>
        </div>
      </footer>
    </main>
  );
}
