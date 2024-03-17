"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useAnimation } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import { MotionDiv } from "components/primitives/motion";

import { cn } from "lib/cn";

import { type Container } from "@tsparticles/engine";

export default function Sparkles({
  id,
  minSize,
  maxSize,
  density,
  className,
}: {
  id: string;
  minSize: number;
  maxSize: number;
  density: number;
  className?: string;
}) {
  const [init, setInit] = useState(false);

  const { theme } = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className={cn("size-full", "pointer-events-none", className)}
      style={{
        WebkitMaskImage: `linear-gradient(to bottom, transparent, hsl(var(--background)))`,
      }}
    >
      <MotionDiv animate={controls} className={cn("size-full", "opacity-0")}>
        {init && (
          <Particles
            id={id}
            className="size-full"
            particlesLoaded={particlesLoaded}
            options={{
              background: {
                color: {
                  value: "transparent",
                },
              },
              fullScreen: {
                enable: false,
                zIndex: 1,
              },
              fpsLimit: 120,
              particles: {
                color: {
                  value: theme === "dark" ? "#fff" : "#000",
                  animation: {
                    h: {
                      count: 0,
                      enable: false,
                      speed: 1,
                      decay: 0,
                      delay: 0,
                      sync: true,
                      offset: 0,
                    },
                    s: {
                      count: 0,
                      enable: false,
                      speed: 1,
                      decay: 0,
                      delay: 0,
                      sync: true,
                      offset: 0,
                    },
                    l: {
                      count: 0,
                      enable: false,
                      speed: 1,
                      decay: 0,
                      delay: 0,
                      sync: true,
                      offset: 0,
                    },
                  },
                },
                groups: {},
                move: {
                  enable: true,
                  random: true,
                  size: true,
                  speed: {
                    min: 0.1,
                    max: 0.4,
                  },
                },
                number: {
                  density: {
                    enable: true,
                    width: 300,
                    height: 300,
                  },
                  value: density,
                },
                opacity: {
                  value: {
                    min: 0.3,
                    max: 1,
                  },
                  animation: {
                    count: 0,
                    enable: true,
                    speed: 0.8,
                    decay: 0,
                    delay: 0,
                    sync: false,
                    mode: "auto",
                    startValue: "random",
                    destroy: "none",
                  },
                },
                size: {
                  value: {
                    min: minSize,
                    max: maxSize,
                  },
                },
              },
              detectRetina: true,
            }}
          />
        )}
      </MotionDiv>
    </MotionDiv>
  );
}
