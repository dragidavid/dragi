import Link from "next/link";
import { Redis } from "@upstash/redis";
import { compareDesc, getYear, parseISO } from "date-fns";

import { source } from "app/source";

import Views from "components/views";
import PageTitle from "components/page-title";

import { cn } from "lib/cn";

const redis = Redis.fromEnv();

export default async function Page() {
  const posts = source.getPages();

  const sortedPosts = posts.sort((a, b) => {
    return compareDesc(new Date(a.data.date), new Date(b.data.date));
  });

  const allViews = await redis.hgetall("post_views");

  let lastYearShown = 0;

  return (
    <div className={cn("relative flex h-full flex-col gap-4 p-6", "xs:p-8")}>
      <PageTitle main="thoughts & snippets" />

      <div className={cn("flex flex-col", "group")}>
        {sortedPosts.map((post) => {
          const year = getYear(parseISO(post.data.date));
          const show = year !== lastYearShown;

          lastYearShown = year;

          return (
            <div
              key={post.file.name}
              className={cn("relative flex items-center text-sm")}
            >
              <span
                className={cn(
                  "relative w-14 flex-none py-2 font-mono",
                  "pointer-events-none",
                  "text-secondary",
                  "md:w-18",
                  show ? "visible" : "invisible",
                )}
              >
                {year}
              </span>

              <Link
                href={post.url}
                className={cn(
                  "absolute z-10 flex w-full items-center py-2 pl-14",
                  "outline-none",
                  "text-primary",
                  "transition-[opacity,filter] duration-200 ease-in-out-quad",
                  "hover:!opacity-100 hover:!blur-none",
                  "focus:!opacity-100 focus:!blur-none",
                  "group-hover:opacity-50 group-hover:blur-sm",
                  "group-focus-within:opacity-50 group-focus-within:blur-sm",
                  "md:pl-[72px]",
                )}
              >
                <span className={cn("flex-1", "truncate")}>
                  {post.data.title}
                </span>

                <Views
                  slug={post.file.name}
                  allViews={allViews}
                  compact
                  className={cn(
                    "w-14 flex-none text-right",
                    "text-secondary",
                    "md:w-18",
                  )}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
