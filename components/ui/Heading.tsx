import { cn } from "lib/cn";

export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={cn(
        "text-2xl font-extrabold leading-normal",
        "bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent",
        "md:text-3xl"
      )}
    >
      {children}
    </h1>
  );
}
