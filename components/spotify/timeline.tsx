"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { useAtomValue } from "jotai";
import { v4 as uuidv4 } from "uuid";

import Artists from "components/spotify/artists";

import Heading from "components/heading";
import StyledLink from "components/styled-link";

import { Skeleton } from "components/primitives/skeleton";

import { cn } from "lib/cn";
import { fetcher } from "lib/fetcher";
import { playerTrackAtom } from "lib/atoms";

import { type Track, type TimelineGap, type TimelineItem } from "lib/types";
import Joint from "components/ui/joint";
import Icon from "components/ui/icon";
import { MotionDiv, MotionLi } from "components/primitives/motion";

type TrackWithType = Track & { type: "track" };
type TrackOrGap = TrackWithType | { type: "gap"; height?: number };

export default function Timeline() {
  const [timelineItems, setTimelineItems] = useState<Record<
    string,
    TimelineItem[]
  > | null>(null);

  const playerTrack = useAtomValue(playerTrackAtom);

  const {
    data: recents,
    isLoading: recentsLoading,
    error: recentsError,
  } = useSWR<Track[]>("/api/spotify/recents", fetcher, {
    refreshInterval: 90000,
    revalidateOnFocus: false,
    errorRetryCount: 2,
    onSuccess: (data) => {
      setTimelineItems(groupTracksByDate(data, playerTrack));
    },
  });

  if (recentsLoading || !recents || !timelineItems) {
    return (
      <div className={cn("flex flex-col pb-6")}>
        <Heading>Recents</Heading>
      </div>
    );
  }

  if (recentsError) {
    return (
      <div className={cn("flex flex-col pb-6")}>
        <Heading>Recents</Heading>
        <div className={cn("mt-4")}>Error loading recents</div>
      </div>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.4,
      }}
      className={cn("flex py-8 text-sm")}
    >
      <div className={cn("flex h-full w-full flex-col gap-4")}>
        {Object.entries(timelineItems).map(([date, items], index) => {
          const last = index === Object.keys(timelineItems).length - 1;

          return (
            <div key={uuidv4()} className={cn("flex")}>
              <div
                className={cn(
                  "w-1/3 pl-6 pr-4 text-right font-mono text-xs leading-5",
                  "text-accent shadow-secondary/50 [text-shadow:1px_1px_0_var(--tw-shadow-color)]",
                  "xs:pl-8",
                )}
              >
                <span className={cn(date === "now" && "invisible")}>
                  {date}
                </span>
              </div>
              <div className={cn("relative")}>
                <span
                  key="middle-line"
                  className={cn(
                    "absolute -bottom-4 top-0 w-px bg-accent",
                    "-translate-x-1/2",
                    date === "now" && "top-1/2",
                    last && "-bottom-8",
                  )}
                />
                {date === "now" && (
                  <>
                    <span
                      className={cn(
                        "absolute -bottom-5 top-3/4 z-10 w-px",
                        "bg-gradient-to-b from-spotify to-accent",
                        "-translate-x-1/2",
                      )}
                    />
                    <div
                      className={cn(
                        "absolute left-0 top-1/2 z-20 flex h-4 w-4 items-center justify-center",
                        "-translate-x-1/2 -translate-y-1/2",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute h-3 w-3 rounded-full",
                          "bg-spotify",
                          "animate-ping",
                        )}
                      />
                      <span
                        className={cn(
                          "absolute h-3 w-3 rounded-full",
                          "bg-background",
                        )}
                      />
                      <Icon
                        name="spotify-logo"
                        size="18"
                        className="text-spotify"
                      />
                    </div>
                  </>
                )}
              </div>

              <ul className={cn("w-2/3 flex-1 pl-4 pr-6", "xs:pr-8")}>
                {items.map((item) =>
                  item.type === "gap" ? (
                    <MotionLi
                      key={uuidv4()}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex"
                      style={{ height: `${item.height}px` }}
                    >
                      {item.content}
                    </MotionLi>
                  ) : (
                    <MotionLi
                      key={uuidv4()}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className={cn(
                        "overflow-hidden text-ellipsis whitespace-nowrap",
                      )}
                    >
                      {item.name}
                    </MotionLi>
                  ),
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </MotionDiv>
  );
}

function calculateAndInsertGaps(tracks: Track[]): TimelineItem[] {
  const maxHeight = 240;
  const heightPerMinutes = 6;

  const result: TimelineItem[] = [];

  for (let i = 0; i < tracks.length; i++) {
    result.push(tracks[i]);

    if (i < tracks.length - 1) {
      const currentTrackTime = new Date(tracks[i].playedAt!).getTime();
      const nextTrackTime = new Date(tracks[i + 1].playedAt!).getTime();

      // Calculate time difference in minutes and ensure it's positive
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
                "flex grow items-center justify-center",
                "text-accent",
              )}
            >
              <Icon name="snooze" size="18" />
            </div>
          ) : undefined;

        result.push({
          type: "gap",
          content,
          height: gapHeight,
        });
      }
    }
  }

  return result;
}

function groupTracksByDate(
  tracks: Track[],
  playerTrack: Track | null,
): Record<string, TimelineItem[]> {
  const grouped: Record<string, TimelineItem[]> = {};

  // Add the currently playing track to the "now" group, if it exists
  if (playerTrack?.currentlyPlaying) {
    grouped["now"] = [playerTrack];
  }

  // Group the tracks by their played date
  tracks.forEach((track) => {
    const playedAtDate = new Date(track.playedAt!).toLocaleDateString();

    if (!grouped[playedAtDate]) {
      grouped[playedAtDate] = [];
    }

    grouped[playedAtDate].push(track);
  });

  // Calculate the gap between each track
  for (const date in grouped) {
    grouped[date] = calculateAndInsertGaps(grouped[date] as Track[]);

    // Insert a gap at the start of every day except "now"
    if (date !== "now") {
      grouped[date].unshift({
        type: "gap",
        content: (
          <div className={cn("relative grow")}>
            <span
              className={cn(
                "absolute -left-1/2 right-0 top-1/2 h-px",
                // "absolute -left-1/2 -right-8 -z-10 h-px",
                // "bg-gradient-to-r from-primary to-background",
                "bg-accent",
                // "bg-extreme",
                // "shadow-[1px_1px_0_hsl(var(--accent))]",
                // "mix-blend-difference",
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
