import Line from "components/ui/Line";
import Joint, { type Position } from "components/ui/Joint";
import Expand from "components/ui/Expand";

import { cn } from "lib/cn";

export default function Module({
  children,
  id,
  page,
  preview = false,
  lines,
  joints,
  moduleStyles,
}: {
  children: React.ReactNode;
  id: string;
  page?: string;
  preview?: boolean;
  lines?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  joints: { [key in Position]: string };
  moduleStyles?: string;
}) {
  return (
    <div key={id} className={cn("relative w-full", moduleStyles)}>
      {lines &&
        (Object.keys(lines) as Array<keyof typeof lines>).map((side) => (
          <Line key={side} className={cn(lines[side])} />
        ))}

      <Joint origin={id} positions={joints} />

      {preview ? (
        <div className={cn("flex-1 overflow-hidden")}>
          {page && <Expand href={page} />}

          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
