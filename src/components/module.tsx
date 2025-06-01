import { memo } from "react";

import { cn } from "@/lib/cn";

export const Module = memo(
  ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className={cn("relative w-full", className)}>
        <div
          className={cn(
            "max-w-full flex-1 overflow-hidden rounded-xl",
            "bg-background inset-ring-inverse/10 inset-ring",
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);
