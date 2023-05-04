import { cn } from "lib/cn";

export default function Line({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "z-10 h-px -translate-y-[0.5px]",
        className,
        "bg-subtle-gray"
      )}
    />
  );
}
