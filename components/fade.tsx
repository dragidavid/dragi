import { cn } from "lib/cn";
import { useMemo } from "react";

export default function Fade({
  sides,
}: {
  sides: { id: string; className: string; blurSteps?: number }[];
}) {
  const blurElements = useMemo(() => {
    return sides
      .map(({ id, className, blurSteps = 2 }) => {
        const steps = blurSteps;

        return Array.from({ length: steps }).map((_, index) => {
          const blurAmount = (index + 0.5) * 2;
          const opacity = 1 - index / steps;

          return (
            <div
              key={`${id}-${index}`}
              className={cn("fixed z-50", "pointer-events-none", className)}
              style={{
                backdropFilter: `blur(${blurAmount}px)`,
                opacity,
                transition: "opacity 0.3s ease",
                WebkitMaskImage: `linear-gradient(to ${id}, transparent ${index * (100 / steps)}%, hsl(var(--background)) ${(index + 1) * (100 / steps)}%)`,
              }}
              aria-hidden
            />
          );
        });
      })
      .flat();
  }, [sides]);

  return <>{blurElements}</>;
}
