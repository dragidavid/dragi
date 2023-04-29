import Link from "next/link";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("text-indigo-500")}>
      <h2 className={cn("text-lg font-extrabold")}>Tools Preview</h2>

      <Link href="/tools">Link</Link>
    </div>
  );
}
