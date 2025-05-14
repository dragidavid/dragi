import { cn } from "@/lib/cn";

const Divider = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) => {
  return <hr className={cn("border-accent", className)} {...props} />;
};

export { Divider };
