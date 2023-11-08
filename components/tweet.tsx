import { Suspense } from "react";
import { getTweet } from "react-tweet/api";
import { EmbeddedTweet, TweetNotFound, type TweetProps } from "react-tweet";

import { Divider } from "components/primitives/divider";
import { Skeleton } from "components/primitives/skeleton";

import { cn } from "lib/cn";

import "styles/tweet.css";

export default async function Tweet({ id }: { id: string }) {
  return (
    <div className={cn("tweet", "my-6 flex justify-center")}>
      <ReactTweet id={id} />
    </div>
  );
}

async function Content({ id, components, onError }: TweetProps) {
  let error;

  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          error = onError(err);
        } else {
          console.error(err);
          error = err;
        }
      })
    : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;

    return <NotFound error={error} />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
}

function ReactTweet(props: TweetProps) {
  return (
    <Suspense
      fallback={
        <div
          className={cn(
            "flex w-full max-w-[550px] flex-col gap-3 rounded-lg p-4",
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
      <Content {...props} />
    </Suspense>
  );
}
