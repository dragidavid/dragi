"use client";

import { useEffect, useRef, useState } from "react";
import Line from "components/line";
import Cross from "components/cross";
import Expand from "components/expand";

import { cn } from "lib/cn";

import type { Side, Corner, LineExtension } from "lib/types";

export default function Module({
  children,
  id,
  page,
  expandable = true,
  preview = false,
  lines,
  tiltedLines,
  lineExtensions,
  crosses,
  className,
}: {
  children: React.ReactNode;
  id: string;
  page?: string;
  expandable?: boolean;
  preview?: boolean;
  lines?: Partial<Record<Side, string>>;
  tiltedLines?: Partial<Record<Corner, string>>;
  lineExtensions?: Partial<Record<LineExtension, string>>;
  crosses?: Partial<Record<Corner, string>>;
  className?: string;
}) {
  const [tiltedLineProps, setTiltedLineProps] = useState<
    Partial<Record<Corner, { angle: number; length: number }>>
  >({});

  const moduleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function calculateTiltedLine() {
      if (!moduleRef.current) return;

      const moduleRect = moduleRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const calculateAngleAndLength = (
        startX: number,
        startY: number,
        endX: number,
        endY: number,
      ) => {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

        // Adjust angle for right side corners
        if (endX > startX) {
          angle = (angle + 180) % 360;
        }

        return { angle, length };
      };

      const newTiltedLineProps = {
        tl: calculateAngleAndLength(moduleRect.left, moduleRect.top, 0, 28),
        tr: calculateAngleAndLength(
          moduleRect.right,
          moduleRect.top,
          screenWidth,
          28,
        ),
        bl: calculateAngleAndLength(
          moduleRect.left,
          moduleRect.bottom,
          0,
          screenHeight,
        ),
        br: calculateAngleAndLength(
          moduleRect.right,
          moduleRect.bottom,
          screenWidth,
          screenHeight,
        ),
      };

      setTiltedLineProps(newTiltedLineProps);
    }

    calculateTiltedLine();
    window.addEventListener("resize", calculateTiltedLine);

    return () => {
      window.removeEventListener("resize", calculateTiltedLine);
    };
  }, []);

  return (
    <div ref={moduleRef} key={id} className={cn("relative w-full", className)}>
      {crosses && <Cross parent={id} positions={crosses} />}

      {lines &&
        (Object.keys(lines) as Array<keyof typeof lines>).map((side) => (
          <Line key={side} className={cn(lines[side])} />
        ))}

      {tiltedLines && tiltedLineProps && (
        <>
          {(Object.keys(tiltedLines) as Array<keyof typeof tiltedLines>).map(
            (corner) =>
              tiltedLineProps[corner] && (
                <Line
                  key={corner}
                  tilted
                  angle={tiltedLineProps[corner]!.angle}
                  length={tiltedLineProps[corner]!.length}
                  origin={corner}
                  className={tiltedLines[corner]}
                />
              ),
          )}
        </>
      )}

      {lineExtensions &&
        (Object.keys(lineExtensions) as Array<keyof typeof lineExtensions>).map(
          (extension) => (
            <Line key={extension} className={cn(lineExtensions[extension])} />
          ),
        )}

      {preview ? (
        <div className={cn("max-w-full flex-1")}>
          {page && expandable && <Expand href={page} />}

          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
