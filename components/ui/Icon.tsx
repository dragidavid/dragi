import { memo } from "react";

import { cn } from "lib/cn";

/**
 * Big thanks to the team at iconoir for the icons!
 *
 * https://iconoir.com/
 */
const icons = {
  code: (
    <>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.818 22v-2.857C6.662 17.592 5.633 16.416 4.682 15m9.772 7v-1.714c4.91 0 4.364-5.714 4.364-5.714s2.182 0 2.182-2.286l-2.182-3.428c0-4.572-3.709-6.816-7.636-6.857-2.2-.023-3.957.53-5.27 1.499"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m13 7 2 2.5-2 2.5M5 7 3 9.5 5 12m5-6-2 7"
      />
    </>
  ),
  flask: (
    <>
      <path stroke="currentColor" strokeLinejoin="round" d="M18.5 15h-13" />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 4H8m1 .5v5.76a2 2 0 0 1-.481 1.302L3.48 17.438A2 2 0 0 0 3 18.74V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-.26a2 2 0 0 0-.482-1.302l-5.037-5.876A2 2 0 0 1 15 10.26V4.5m-3 4.51.01-.011M11 2.01l.01-.011"
      />
    </>
  ),
  home: (
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 21H7a4 4 0 0 1-4-4v-6.292a4 4 0 0 1 1.927-3.421l5-3.03a4 4 0 0 1 4.146 0l5 3.03A4 4 0 0 1 21 10.707V17a4 4 0 0 1-4 4zm-8-4h6"
    />
  ),
  tools: (
    <>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.05 10.607-7.07 7.07a2 2 0 0 0 0 2.83v0a2 2 0 0 0 2.828 0l7.07-7.072m4.315.365 3.878 3.878a2 2 0 0 1 0 2.828v0a2 2 0 0 1-2.828 0l-6.209-6.208M6.733 5.904 4.61 6.61 2.49 3.075l1.414-1.414L7.44 3.782l-.707 2.122zm0 0 2.83 2.83"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.05 10.607c-.844-2.153-.679-4.978 1.061-6.718 1.74-1.74 4.95-2.121 6.717-1.06l-3.04 3.04-.283 3.111 3.111-.282 3.04-3.041c1.062 1.768.68 4.978-1.06 6.717-1.74 1.74-4.564 1.905-6.717 1.061"
      />
    </>
  ),
  spotify: (
    <>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 15s4.5-1 9 1m-9.5-4s6-1.5 11 1.5M6 9c3-.5 8-1 13 2"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
      />
    </>
  ),
};

export default memo(function Icon({
  name,
  className,
}: {
  name: keyof typeof icons;
  className?: string;
}) {
  return (
    <div
      className={cn("h-8 w-8", "xs:h-9 xs:w-9", "md:h-10 md:w-10", className)}
    >
      <svg
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
        fill="none"
        color="currentColor"
        strokeWidth="1"
      >
        {icons[name]}
      </svg>
    </div>
  );
});
