import { cn } from "lib/cn";

export default function Fade({
  sides,
}: {
  sides: { id: string; className: string }[];
}) {
  return (
    <>
      {sides.map(({ id, className }) => (
        <div
          key={id}
          className={cn("pointer-events-none", "backdrop-blur-sm", className)}
          style={{
            WebkitMaskImage: `linear-gradient(to ${id}, transparent, var(--almost-black))`,
          }}
        />
      ))}
    </>
  );
}
