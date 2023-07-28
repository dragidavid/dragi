import { cn } from "lib/cn";

export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={cn(
        "text-3xl font-black leading-normal",
        "bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent",
        "md:text-4xl"
      )}
    >
      {children}
    </h1>
  );
}
