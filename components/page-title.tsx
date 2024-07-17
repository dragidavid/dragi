import { cn } from "lib/cn";

export default function PageTitle({ main }: { main: string }) {
  return (
    <div className={cn("relative flex items-end gap-1 text-xs leading-5")}>
      <span className="highlight">{main}</span>
    </div>
  );
}
