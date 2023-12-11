import { Redis } from "@upstash/redis";

import { cn } from "lib/cn";

const redis = Redis.fromEnv();

export default async function Views({
  slug,
  track = false,
  allViews,
  compact = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  slug: string;
  track?: boolean;
  allViews?: Record<string, unknown> | null;
  compact?: boolean;
}) {
  async function getContent(): Promise<string> {
    if (process.env.NODE_ENV !== "development") {
      return "▲";
    }

    if (track) {
      const views = await redis.hincrby("post_views", slug, 1);

      return views.toLocaleString();
    }

    if (allViews) {
      const n = Number(allViews[slug]) || "0";

      return n.toLocaleString();
    }

    return "0";
  }

  const content = await getContent();

  return (
    <span className={cn("tabular-nums", className)} {...props}>
      {content} {!compact && "views"}
    </span>
  );
}
