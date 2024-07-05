import Line from "components/line";

import { cn } from "lib/cn";

export default function PageTitle({
  main,
  sub,
}: {
  main: string;
  sub?: string;
}) {
  return (
    <div className={cn("relative flex items-end gap-1 text-sm")}>
      <Line
        className={cn(
          "inset-x-0 top-2.5 h-px -translate-y-1/2",
          "bg-accent bg-horizontal-dashed",
        )}
      />

      <span className="highlight">{main}</span>

      {sub && (
        <span className={cn("font-mono text-xs italic", "text-secondary/50")}>
          {sub}
        </span>
      )}
    </div>
  );
}
