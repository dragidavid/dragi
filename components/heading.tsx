// TODO - decide whether I need this or not...

import { cn } from "lib/cn";

export default function Heading({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-2xl font-extrabold leading-normal tracking-tighter",
        "bg-gradient-to-br from-inverse via-primary/80 to-primary/50 bg-clip-text text-transparent",
        "md:text-3xl",
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
