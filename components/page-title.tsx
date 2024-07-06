import Line from "components/line";

import { cn } from "lib/cn";

export default function PageTitle({ main }: { main: string }) {
  return (
    <div className={cn("relative flex items-end gap-1 text-sm")}>
      <Line
        className={cn(
          "inset-x-0 top-3 h-px -translate-y-1/2",
          "bg-horizontal-dashed",
        )}
      />

      <span className="highlight">{main}</span>
    </div>
  );
}
