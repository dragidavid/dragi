import Line from "components/line";
import Cross from "components/cross";
import Expand from "components/expand";

import { cn } from "lib/cn";

import { type Side, type Corner } from "lib/types";

export default function Module({
  children,
  id,
  page,
  preview = false,
  lines,
  tiltedLines,
  crosses,
  className,
}: {
  children: React.ReactNode;
  id: string;
  page?: string;
  preview?: boolean;
  lines?: Partial<Record<Side, string>>;
  tiltedLines?: Partial<Record<Corner, string>>;
  crosses?: Record<Corner, string>;
  className?: string;
}) {
  return (
    <div key={id} className={cn("relative w-full", className)}>
      {lines &&
        (Object.keys(lines) as Array<keyof typeof lines>).map((side) => (
          <Line key={side} className={cn(lines[side])} />
        ))}

      {crosses && <Cross origin={id} positions={crosses} />}

      {tiltedLines &&
        (Object.keys(tiltedLines) as Array<keyof typeof tiltedLines>).map(
          (corner) => <Line key={corner} className={cn(tiltedLines[corner])} />,
        )}

      {preview ? (
        <div className={cn("flex-1 overflow-hidden")}>
          <div
            className={cn(
              "absolute -inset-[0.5px] z-30",
              "pointer-events-none",
              "border-b border-l border-r border-muted",
              "md:border",
              id === "about" && "border-t-0",
              id === "spotify" && "border-b-0",
            )}
          />

          {page && <Expand href={page} />}

          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
