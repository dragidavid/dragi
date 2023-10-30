import { Suspense } from "react";
import { getTweet } from "react-tweet/api";
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  type TweetProps,
} from "react-tweet";
import "./tweet.css";
import { cn } from "lib/cn";
import { Skeleton } from "components/ui/primitives/Skeleton";
import Divider from "components/ui/primitives/Divider";

const TweetContent = async ({ id, components, onError }: TweetProps) => {
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
};

export const ReactTweet = (props: TweetProps) => (
  <Suspense
    fallback={
      <div
        className={cn(
          "flex w-full max-w-[550px] flex-col gap-3 rounded-lg px-4 py-3",
          "border border-accent bg-black",
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
    <TweetContent {...props} />
  </Suspense>
);

export async function Tweet({ id }: { id: string }) {
  return (
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        <ReactTweet id={id} />
      </div>
    </div>
  );
}
