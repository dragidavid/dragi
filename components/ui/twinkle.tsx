"use client";

import { useEffect, useRef } from "react";
import { cn } from "lib/cn";
import { useTheme } from "next-themes";
import { random } from "lib/random";

export default function Twinkle({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const drawDots = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) => {
    const numberOfDots = Math.floor((canvas.width * canvas.height) / 500);
    const dots = [];

    for (let i = 0; i < numberOfDots; i++) {
      let overlap = false;

      const dotSize = Math.random() * 1 + 0.5;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;

      for (const dot of dots) {
        const distance = Math.sqrt((dot.x - x) ** 2 + (dot.y - y) ** 2);
        if (distance < dot.size + dotSize) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        const color =
          theme === "dark"
            ? `hsl(0, 0%, ${random(60, 100, true)}%)`
            : `hsl(0, 0%, ${random(0, 40, true)}%)`;

        context.fillStyle = color;

        context.beginPath();
        context.arc(x, y, dotSize, 0, Math.PI * 2);
        context.fill();

        // Add the new dot to the list
        dots.push({ x, y, size: dotSize });
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === containerRef.current) {
          if (canvas && context) {
            canvas.width = entry.contentRect.width;
            canvas.height = entry.contentRect.height;

            drawDots(canvas, context);
          }
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (canvas && context) {
      canvas.width = containerRef.current?.clientWidth ?? 0;
      canvas.height = containerRef.current?.clientHeight ?? 0;

      drawDots(canvas, context);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", "pointer-events-none", className)}
      style={{
        WebkitMaskImage: `linear-gradient(to bottom, transparent, hsl(var(--background)))`,
      }}
    >
      <canvas ref={canvasRef} className="dot-canvas" />
      {/* <canvas ref={canvasRef} /> */}
    </div>
  );
}
