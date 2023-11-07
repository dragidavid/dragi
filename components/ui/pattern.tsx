import { memo } from "react";

import { cn } from "lib/cn";

export default memo(function Pattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-full w-full",
        "pointer-events-none",
        "text-accent",
        className,
      )}
      style={{
        WebkitMaskImage: `linear-gradient(to bottom, transparent, hsl(var(--background)))`,
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="plus-pattern"
            height="20"
            width="20"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.5) rotate(45)"
          >
            <rect x="0" y="0" height="100%" width="100%" fill="none" />
            <path
              d="M3.25 10h13.5M10 3.25v13.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </pattern>
        </defs>
        <rect
          height="100%"
          width="100%"
          fill="url(#plus-pattern)"
          transform="translate(0,0)"
        />
      </svg>
    </div>
  );
});
