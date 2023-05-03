import { cn } from "lib/cn";

export default function Fade({
  sides,
}: {
  sides: { id: string; styles: string }[];
}) {
  return (
    <>
      {sides.map(({ id, styles }) => (
        <div key={id} className={cn("pointer-events-none", styles)} />
      ))}
    </>
  );
}
