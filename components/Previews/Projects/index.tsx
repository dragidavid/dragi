import Link from "next/link";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("text-orange-500")}>
      <h2 className={cn("text-lg font-extrabold")}>Projects Preview</h2>

      <Link href="/projects">Link</Link>
    </div>
  );
}
