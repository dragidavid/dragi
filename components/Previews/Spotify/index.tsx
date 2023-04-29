import Link from "next/link";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("text-green-500")}>
      <h2 className={cn("text-lg font-extrabold")}>Spotify Preview</h2>

      <Link href="/spotify">Link</Link>
    </div>
  );
}
