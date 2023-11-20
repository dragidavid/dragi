import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium text-primary transition-colors duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-background hover:bg-primary/80",
        destructive: "bg-red-700 hover:bg-red-700/80",
        outline: "border border-accent bg-transparent hover:bg-accent",
        secondary: "bg-secondary/50 hover:bg-secondary/30",
        ghost: "hover:bg-accent",
        link: "underline-offset-4 hover:underline",
        subtle:
          "hover:text-primary focus-visible:text-primary focus-visible:ring-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & { asChild?: boolean }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { buttonVariants, Button };
