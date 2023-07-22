import { cn } from "lib/cn";

export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={cn(
        "text-4xl font-black",
        "bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent"
      )}
    >
      {children}
    </h1>
  );
}
