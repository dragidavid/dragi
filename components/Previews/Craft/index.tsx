import Link from "next/link";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("text-blue-500")}>
      <h2 className={cn("text-lg font-extrabold")}>Craft Preview</h2>

      <Link href="/craft">Link</Link>
    </div>
  );
}
