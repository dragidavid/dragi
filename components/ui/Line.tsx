import { cn } from "lib/cn";

export default function Line({
  fullWidth,
  className,
}: {
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "z-10 h-px -translate-y-[0.5px]",
        fullWidth && "fixed left-0 w-screen",
        className,
        "bg-subtle-gray"
      )}
    />
  );
}
