import Status from "components/Status";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("relative h-full")}>
      <Status />
    </div>
  );
}
