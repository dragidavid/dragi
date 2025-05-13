import PageTitle from "@/components/page-title";

import { cn } from "@/lib/cn";

export default function Page() {
  return (
    <div className={cn("relative flex h-full flex-col gap-4 p-6", "xs:p-8")}>
      <PageTitle main="stack" />
    </div>
  );
}
