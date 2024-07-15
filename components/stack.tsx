import { cn } from "lib/cn";
import { getLogos } from "lib/get-logos";

export default async function Stack({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const logos = await getLogos();

  return (
    <div
      className={cn(
        "grid h-full auto-rows-auto grid-cols-3 grid-rows-[repeat(3,auto)] gap-px",
        "bg-muted",
        className,
      )}
    >
      {Object.entries(logos).map(([id, logo]) => (
        <div
          key={id}
          className={cn(
            "grid size-auto min-h-20 place-items-center",
            "bg-background",
            "md:min-h-max",
          )}
        >
          <logo.Component className="size-4" />
        </div>
      ))}
    </div>
  );
}
