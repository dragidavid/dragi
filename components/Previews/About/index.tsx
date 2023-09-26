import Status from "components/Status";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("relative flex h-full flex-col")}>
      <div className="h-[21px]">
        <Status play />
      </div>

      <div className={cn("flex flex-col space-y-6 px-4 py-8")}>
        <p className={cn("font-medium", "text-secondary")}>David Dragovacz</p>

        <h3 className={cn("text-xl font-light")}>
          Crafting web experiences with a keen eye for design and an obsession
          for the minutiae.
        </h3>
      </div>
    </div>
  );
}
