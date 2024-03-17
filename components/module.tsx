import Line from "components/ui/line";
import Cross from "components/ui/cross";
import Expand from "components/ui/expand";

import { cn } from "lib/cn";

import { type Side, type CrossPosition } from "lib/types";

export default function Module({
  children,
  id,
  page,
  preview = false,
  lines,
  crosses,
  className,
}: {
  children: React.ReactNode;
  id: string;
  page?: string;
  preview?: boolean;
  lines?: Partial<Record<Side, string>>;
  crosses?: Record<CrossPosition, string>;
  className?: string;
}) {
  return (
    <div key={id} className={cn("relative w-full", className)}>
      {lines &&
        (Object.keys(lines) as Array<keyof typeof lines>).map((side) => (
          <Line key={side} className={lines[side]} />
        ))}

      {crosses && <Cross origin={id} positions={crosses} />}

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
