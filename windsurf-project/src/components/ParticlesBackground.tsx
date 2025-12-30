"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(() => ({
        fullScreen: { enable: true, zIndex: 0 },
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 120,
        particles: {
          color: { value: ["#4ade80", "#22d3ee", "#818cf8", "#a855f7"] },
          links: {
            color: "#4ade80",
            distance: 120,
            enable: true,
            opacity: 0.15,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.03,
            },
          },
          move: {
            enable: true,
            direction: "none",
            outModes: { default: "bounce" },
            random: true,
            speed: 1.2,
            straight: false,
            attract: {
              enable: true,
              rotate: { x: 600, y: 1200 },
            },
          },
          number: {
            density: { enable: true },
            value: 80,
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: {
              enable: true,
              speed: 0.5,
            },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: ["grab", "bubble"],
              parallax: {
                enable: true,
                force: 60,
                smooth: 10,
              },
            },
            onClick: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: { 
                opacity: 0.5,
                color: "#4ade80",
              },
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 0.3,
              opacity: 0.8,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0"
    />
  );
}
