import Link from "next/link";
import { Redis } from "@upstash/redis";
import { compareDesc, getYear, parseISO } from "date-fns";

import { allPosts as posts } from "contentlayer/generated";

import Views from "components/views";

import { cn } from "lib/cn";

const redis = Redis.fromEnv();

export default async function Page() {
  const sortedPosts = posts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  const allViews = await redis.hgetall("post_views");

  let lastYearShown = 0;

  return (
    <div className={cn("relative flex h-full flex-col p-6", "xs:p-8")}>
      {/* <p>check out some of blah blah</p> */}

      <div className={cn("mb-4 flex text-sm", "text-secondary")}>
        <span className={cn("w-14 flex-none", "md:w-18")}>date</span>
        <span className="flex-1">title</span>
        <span className={cn("w-14 flex-none text-right", "md:w-18")}>
          views
        </span>
      </div>

      <div className={cn("flex flex-col", "group")}>
        {sortedPosts.map((post) => {
          const year = getYear(parseISO(post.date));
          const show = year !== lastYearShown;

          lastYearShown = year;

          return (
            <div key={post._id} className={cn("relative flex items-center")}>
              <span
                className={cn(
                  "relative w-14 flex-none py-2 text-sm tabular-nums",
                  "pointer-events-none",
                  "text-secondary",
                  "md:w-18",
                  show ? "visible" : "invisible",
                )}
              >
                {year}
              </span>

              <Link
                href={post.slug}
                className={cn(
                  "absolute z-10 flex w-full items-center py-2 pl-14",
                  "transition-all duration-100 ease-in-out",
                  "hover:!text-primary hover:!blur-none",
                  "group-hover:text-secondary group-hover:blur-xs",
                  "md:pl-[72px]",
                )}
              >
                <span className={cn("flex-1", "truncate")}>{post.title}</span>

                <Views
                  slug={post.slugAsParams}
                  allViews={allViews}
                  compact
                  className={cn("w-14 flex-none text-right text-sm", "md:w-18")}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
