"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import GlassCard from "./GlassCard";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  github,
}: ProjectCardProps) {
  return (
    <GlassCard className="group">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-white/90 group-hover:text-[#4ade80] transition-colors">
            {title}
          </h3>
          <div className="flex gap-3">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <Github size={18} />
              </motion.a>
            )}
            {link && (
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-white/40 hover:text-[#4ade80] transition-colors"
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
          </div>
        </div>

        <p className="text-sm text-white/50 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
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
  );
}
