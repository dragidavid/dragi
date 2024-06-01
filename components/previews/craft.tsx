import Link from "next/link";
import { compareDesc } from "date-fns";

import { allPosts as posts } from "contentlayer/generated";

import { MotionPath } from "components/primitives/motion";

import { cn } from "lib/cn";

export default async function Preview() {
  const sortedPosts = posts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return (
    <div className={cn("relative flex h-full flex-col")}>
      <div className={cn("px-1 py-0.5")}>
        <svg height="20" viewBox="0 0 158 24" fill="none">
          <defs>
            <linearGradient
              id="craft-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="hsl(var(--inverse))" />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.5"
              />
            </linearGradient>
          </defs>

          <MotionPath
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: 1,
              pathLength: 1,
              transition: { duration: 1, opacity: { duration: 0.2 } },
            }}
            d="M15.1566 3C-0.68555 16.9536 1.76262 24.2187 6.87562 19.6255C16.8877 10.6314 29.8656 5.96884 25.3392 11.9065C21.7609 16.6007 16.2897 21.4068 24.2108 18.438C32.1319 15.4691 43.4477 11.9065 36.6582 18.438C30.81 24.0639 41.7504 17.8442 50.803 14.5785C59.5639 11.418 63.2505 10.719 57.5926 16.6567C50.8563 23.726 71.1083 18.4142 78.5269 14.8754C90.9743 8.93768 88.1422 17.5473 107.945 19.6255C128.11 21.7417 166.79 11.0159 151.514 17.8442"
            stroke="url(#craft-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className={cn("h-full px-4 py-6")}>
        <div className={cn("flex flex-col", "group")}>
          {sortedPosts.slice(0, 5).map((post) => (
            <Link
              key={post._id}
              href={post.slug}
              className={cn(
                "py-1 text-sm",
                "truncate",
                "select-none outline-none",
                "text-primary",
                "transition-[opacity,filter] duration-200 ease-in-out",
                "first:pt-0",
                "hover:!opacity-100 hover:!blur-none",
                "focus:!opacity-100 focus:!blur-none",
                "group-hover:opacity-50 group-hover:blur-sm",
                "group-focus-within:opacity-50 group-focus-within:blur-sm",
              )}
            >
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
