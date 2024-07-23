"use client";

import { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import { isEqual } from "lodash";
import { differenceInDays } from "date-fns";
import { AnimatePresence, useInView } from "framer-motion";

import Artists from "components/spotify/artists";

import StyledLink from "components/styled-link";
import { CrossShape } from "components/cross";

import { MotionDiv, MotionLi } from "components/primitives/motion";

import { cn } from "lib/cn";
import { fetcher } from "lib/fetcher";

import type { Track, TimelineItem, Player } from "lib/types";

export default function Timeline() {
  const [timelineItems, setTimelineItems] = useState<Record<
    string,
    TimelineItem[]
  > | null>(null);

  const { data: player, error: playerError } = useSWR<Player>(
    "/api/player",
    fetcher,
    {
      refreshInterval: 90000,
      revalidateOnFocus: false,
      errorRetryCount: 1,
    },
  );

  useEffect(() => {
    if (player?.recentlyPlayed) {
      const newItems = groupTracksByDate(player);
      setTimelineItems((prevItems) => {
        if (isEqual(prevItems, newItems)) return prevItems;
        return newItems;
      });
    }
  }, [player]);

  if (!timelineItems && !playerError) {
    return null;
  }

  if (playerError || !timelineItems) {
    return (
      <Container>
        <ErrorMessage />
      </Container>
    );
  }

  return (
    <Container>
      <TimelineContent items={timelineItems} />
    </Container>
  );
}

function ErrorMessage() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "grid size-full place-items-center font-mono text-xs",
        "select-none",
        "text-primary/20",
      )}
    >
      <span>that "something" happened here too</span>
    </MotionDiv>
  );
}

function TimelineContent({ items }: { items: Record<string, TimelineItem[]> }) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className={cn("flex size-full flex-col gap-4")}
    >
      {Object.entries(items).map(([date, dateItems], index) => (
        <div key={date}>
          <TimelineDay
            date={date}
            items={dateItems}
            isLast={index === Object.keys(items).length - 1}
          />
        </div>
      ))}
    </MotionDiv>
  );
}

function TimelineDay({
  date,
  items,
  isLast,
}: {
  date: string;
  items: TimelineItem[];
  isLast: boolean;
}) {
  return (
    <div className="flex">
      <DateLabel date={date} />
      <TimelineLine date={date} isLast={isLast} />
      <TimelineItems items={items} />
    </div>
  );
}

function DateLabel({ date }: { date: string }) {
  return (
    <div
      className={cn(
        "w-1/5 text-sm leading-5",
        "select-none",
        "highlight",
        "md:w-1/3 md:pl-8",
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-end pr-4",
          date === "now" && "invisible",
        )}
      >
        <span>{date}</span>
        <CrossShape
          className={cn("absolute right-0 z-10 size-2", "translate-x-1/2")}
        />
      </div>
    </div>
  );
}

function TimelineLine({ date, isLast }: { date: string; isLast: boolean }) {
  return (
    <div className="relative">
      <div
        className={cn(
          "absolute -bottom-4 top-2.5 w-px",
          "bg-vertical-dashed",
          "-translate-x-1/2",
          date === "now" && "top-1/2",
          isLast && "-bottom-8",
        )}
      />
      {date === "now" && <NowPlayingIndicator />}
    </div>
  );
}

function NowPlayingIndicator() {
  return (
    <>
      <span
        className={cn(
          "absolute -bottom-8 top-3/4 z-20 w-px rounded-full",
          "bg-gradient-to-b from-spotify to-transparent backdrop-blur-sm",
          "-translate-x-1/2",
        )}
      />
      <div
        className={cn(
          "absolute left-0 top-1/2 z-20 grid size-4 place-items-center",
          "-translate-x-1/2 -translate-y-1/2",
        )}
      >
        <span
          className={cn(
            "absolute size-4 rounded-full",
            "bg-spotify blur-xs",
            "animate-ping",
          )}
        />
        <span className={cn("absolute size-2 rounded-full", "bg-spotify")} />
        <span
          className={cn(
            "absolute size-12 rounded-full",
            "bg-spotify/40 blur-xl",
          )}
        />
      </div>
    </>
  );
}

function TimelineItems({ items }: { items: TimelineItem[] }) {
  return (
    <ul className={cn("w-2/3 flex-1 pl-4 pr-6", "xs:pr-8")}>
      {items.map((item, index) =>
        index === 0 ? (
          <AnimatePresence key="first-item" initial={false} mode="wait">
            <TimelineItem
              key={item.type === "gap" ? `gap-${index}` : item.id}
              item={item}
            />
          </AnimatePresence>
        ) : (
          <TimelineItem
            key={
              item.type === "gap" ? `gap-${index}` : `track-${item.id}-${index}`
            }
            item={item}
          />
        ),
      )}
    </ul>
  );
}

function TimelineItem({ item }: { item: TimelineItem }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  if (item.type === "gap") {
    return <GapItem item={item} />;
  }

  return (
    <MotionLi
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <TrackItem item={item} />
    </MotionLi>
  );
}

function GapItem({ item }: { item: TimelineItem & { type: "gap" } }) {
  return (
    <li className="flex" style={{ height: `${item.height}px` }}>
      {item.content}
    </li>
  );
}

function TrackItem({ item }: { item: Track }) {
  return (
    <div className="flex">
      <div className={cn("overflow-hidden text-ellipsis whitespace-nowrap")}>
        <StyledLink href={item.trackUrl}>{item.name}</StyledLink>
        <div
          className={cn(
            "overflow-hidden text-ellipsis whitespace-nowrap text-xs",
            "text-secondary",
          )}
        >
          <Artists artists={item.artists} />
        </div>
      </div>
    </div>
  );
}

function calculateAndInsertGaps(tracks: Track[]): TimelineItem[] {
  const maxHeight = 240;
  const heightPerMinutes = 8;

  const result: TimelineItem[] = [];

  for (let i = 0; i < tracks.length; i++) {
    result.push(tracks[i]);

    if (i < tracks.length - 1) {
      const currentTrackTime = new Date(tracks[i].playedAt!).getTime();
      const nextTrackTime = new Date(tracks[i + 1].playedAt!).getTime();

      let timeDifferenceInMinutes =
        Math.abs(nextTrackTime - currentTrackTime) / (1000 * 60);

      const gapHeight = Math.min(
        timeDifferenceInMinutes * heightPerMinutes,
        maxHeight,
      );

      if (gapHeight > 0) {
        const content =
          gapHeight > 100 ? (
            <div
              className={cn(
                "flex grow items-center justify-center font-mono text-2xs",
                "text-accent",
              )}
            >
              <span>zzz</span>
            </div>
          ) : undefined;

        result.push({ type: "gap", content, height: gapHeight });
      }
    }
  }

  return result;
}

function groupTracksByDate(player: Player): Record<string, TimelineItem[]> {
  const grouped: Record<string, TimelineItem[]> = {};

  const { nowPlaying, recentlyPlayed } = player;

  if (nowPlaying?.currentlyPlaying) {
    grouped["now"] = [nowPlaying];
  }

  recentlyPlayed!.forEach((track) => {
    const playedAtDate = `D+${differenceInDays(new Date(), new Date(track.playedAt!))}`;
    if (!grouped[playedAtDate]) {
      grouped[playedAtDate] = [];
    }
    grouped[playedAtDate].push(track);
  });

  for (const date in grouped) {
    grouped[date] = calculateAndInsertGaps(grouped[date] as Track[]);

    if (date !== "now") {
      grouped[date].unshift({
        type: "gap",
        content: (
          <div className={cn("relative grow")}>
            <span
              className={cn(
                "absolute -inset-x-screen top-1/2 h-px",
                "bg-horizontal-dashed",
                "-translate-y-1/2",
              )}
            />
          </div>
        ),
        height: 20,
      });
    }
  }

  return grouped;
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("relative flex h-full overflow-x-clip py-8 text-sm")}>
      {children}
    </div>
  );
}
