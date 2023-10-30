import { cn } from "lib/cn";

import { useWindowSize } from "lib/hooks/useWindowSize";

export default function Separator({ hidden = false }: { hidden?: boolean }) {
  const { isXs } = useWindowSize();

  if (hidden) return null;

  return (
    <div
      className={cn(
        "mx-5 h-1 w-1 rounded-full",
        "bg-secondary/40",
        isXs && "my-3",
      )}
    />
  );
}
