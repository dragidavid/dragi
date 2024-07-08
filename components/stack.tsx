import { cn } from "lib/cn";
import { getLogos } from "lib/get-logos";

export default async function Uses() {
  const logos = await getLogos();

  return (
    <div
      className={cn(
        "grid h-full auto-rows-auto grid-cols-3 grid-rows-[repeat(3,auto)] gap-px",
        "bg-muted",
      )}
    >
      {Object.entries(logos).map(([id, logo]) => (
        <div
          key={id}
          className={cn(
            "flex size-auto min-h-20 items-center justify-center",
            "bg-background",
          )}
        >
          <logo.Component className="size-4" />
        </div>
      ))}
    </div>
  );
}
