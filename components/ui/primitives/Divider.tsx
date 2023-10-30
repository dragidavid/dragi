import { cn } from "lib/cn";

export default function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-accent", className)} />;
}
