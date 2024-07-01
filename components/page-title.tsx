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
    <div className={cn("relative flex flex-col gap-2 text-sm")}>
      <p className="highlight">{main}</p>

      <Line
        className={cn("inset-x-0 top-6 h-px", "bg-accent bg-horizontal-dashed")}
      />

      {sub && (
        <p className={cn("font-mono text-xs", "text-secondary/50")}>{sub}</p>
      )}
    </div>
  );
}
