import Line from "components/ui/line";
import Joint, { type Position } from "components/ui/joint";
import Expand from "components/ui/expand";

import { cn } from "lib/cn";

export default function Module({
  children,
  id,
  page,
  preview = false,
  lines,
  joints,
  className,
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
  joints?: { [key in Position]: string };
  className?: string;
}) {
  return (
    <div key={id} className={cn("relative w-full", className)}>
      {lines &&
        (Object.keys(lines) as Array<keyof typeof lines>).map((side) => (
          <Line key={side} className={lines[side]} />
        ))}

      {joints && <Joint origin={id} positions={joints} />}

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
