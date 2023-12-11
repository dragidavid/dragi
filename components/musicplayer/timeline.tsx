"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { useAtomValue } from "jotai";
import { v4 as uuidv4 } from "uuid";

import Artists from "components/musicplayer/artists";

import Heading from "components/heading";
import StyledLink from "components/styled-link";

import { Skeleton } from "components/primitives/skeleton";

import { cn } from "lib/cn";
import { fetcher } from "lib/fetcher";
import { playerTrackAtom } from "lib/atoms";

import { type Track, type TimelineGap, type TimelineItem } from "lib/types";

type TrackWithType = Track & { type: "track" };
type TrackOrGap = TrackWithType | { type: "gap"; height?: number };

export default function Timeline() {
  const [timelineItems, setTimelineItems] = useState<Record<
    string,
    TimelineItem[]
  > | null>(null);

  const playerTrack = useAtomValue(playerTrackAtom);

  console.log(timelineItems);

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
    <div className={cn("flex py-8 text-sm")}>
      <div className={cn("flex h-full w-full flex-col gap-4")}>
        {Object.entries(timelineItems).map(([date, items]) => (
          <div key={uuidv4()} className={cn("flex")}>
            <div className="w-1/3 text-right">{date}</div>
            <div className={cn("relative")}>
              <span
                className={cn(
                  "absolute -bottom-4 top-0 w-px bg-accent",
                  "-translate-x-1/2",
                  date === "now" && "top-1/2",
                )}
              />
              {date === "now" && (
                <span
                  className={cn(
                    "absolute h-2 w-2 rounded-full bg-red-600",
                    // "-translate-x-[0.5px]",
                  )}
                />
              )}
            </div>

            <ul className="flex-1">
              {items.map((item) =>
                item.type === "gap" ? (
                  <li
                    key={uuidv4()}
                    className="flex"
                    style={{ height: `${item.height}px` }}
                  >
                    {item.content}
                  </li>
                ) : (
                  <li key={uuidv4()}>{item.name}</li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
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
                "bg-fuchsia-700",
              )}
            >
              long gap content
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
          <div
            className={cn(
              "flex grow items-center justify-center",
              "bg-red-600",
            )}
          >
            start of day
          </div>
        ),
        height: 20,
      });
    }
  }

  return grouped;
}
