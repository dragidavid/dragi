import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { getTweet as _getTweet } from "react-tweet/api";
import { EmbeddedTweet, TweetNotFound } from "react-tweet";

import { Divider } from "components/primitives/divider";
import { Skeleton } from "components/primitives/skeleton";

import { cn } from "lib/cn";

import "styles/tweet.css";

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ["tweet"],
  { revalidate: 3600 * 24 },
);

export default async function Tweet({ id }: { id: string }) {
  return (
    <div className={cn("tweet", "my-6 flex justify-center")}>
      <ReactTweet id={id} />
    </div>
  );
}

async function Content({ id }: { id: string }) {
  try {
    const tweet = await getTweet(id);

    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />;
  } catch (e) {
    return <TweetNotFound error={e} />;
  }
}

function ReactTweet({ id }: { id: string }) {
  return (
    <Suspense
      fallback={
        <div
          className={cn(
            "flex w-full max-w-lg flex-col gap-3 rounded-lg p-4",
            "border border-accent bg-extreme",
          )}
        >
          <Skeleton className={cn("h-12")} />
          <Skeleton className={cn("h-24")} />

          <Divider />

          <Skeleton className={cn("h-8")} />
          <Skeleton className={cn("h-10")} />
        </div>
      }
    >
      <Content id={id} />
    </Suspense>
  );
}
