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
  crosses?: Record<Corner, string>;
  className?: string;
}) {
  return (
    <div key={id} className={cn("relative w-full", className)}>
      {crosses && <Cross origin={id} positions={crosses} />}

      {lines &&
        (Object.keys(lines) as Array<keyof typeof lines>).map((side) => (
          <Line key={side} className={cn(lines[side])} />
        ))}

      {tiltedLines &&
        (Object.keys(tiltedLines) as Array<keyof typeof tiltedLines>).map(
          (corner) => <Line key={corner} className={cn(tiltedLines[corner])} />,
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
