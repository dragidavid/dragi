"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { isEqual } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { differenceInDays } from "date-fns";

import Artists from "components/spotify/artists";

import Icon from "components/icon";
import StyledLink from "components/styled-link";

import { MotionDiv, MotionLi } from "components/primitives/motion";

import { cn } from "lib/cn";
import { fetcher } from "lib/fetcher";

import { type Track, type TimelineItem, type Player } from "lib/types";

export default function Timeline() {
  const [localPlayer, setLocalPlayer] = useState<Player | null>(null);
  const [timelineItems, setTimelineItems] = useState<Record<
    string,
    TimelineItem[]
  > | null>(null);

  const {
    data: player,
    isLoading: playerLoading,
    error: playerError,
  } = useSWR<Player>("/api/player", fetcher, {
    refreshInterval: 90000,
    revalidateOnFocus: false,
    errorRetryCount: 1,
  });

  useEffect(() => {
    if (player && !localPlayer) {
      setLocalPlayer(player);
    }
  }, [player, localPlayer]);

  useEffect(() => {
    if (player?.recentlyPlayed) {
      if (!isEqual(player, localPlayer)) {
        setLocalPlayer(player);

        setTimelineItems(groupTracksByDate(player));
      }
    }
  }, [player, localPlayer]);

  if (playerLoading || !timelineItems) {
    return null;
  }

  if ((playerError || !timelineItems) && !playerLoading) {
    return (
      <Container>
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.8,
          }}
          className={cn(
            "flex size-full flex-col items-center justify-center text-sm",
            "select-none",
            "text-secondary/20",
          )}
        >
          <span>that "something" happened here too</span>
        </MotionDiv>
      </Container>
    );
  }

  return (
    <Container>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.8,
        }}
        className={cn("flex size-full flex-col gap-4")}
      >
        {Object.entries(timelineItems).map(([date, items], index) => {
          const last = index === Object.keys(timelineItems).length - 1;

          return (
            <div key={uuidv4()} className="flex">
              <div
                className={cn(
                  "w-1/5 text-center font-mono text-sm leading-5",
                  "select-none",
                  "highlight",
                  "md:w-1/3 md:pl-8 md:pr-4 md:text-right",
                )}
              >
                <span className={cn(date === "now" && "invisible")}>
                  {date}
                </span>
              </div>
              <div className="relative">
                <div
                  className={cn(
                    "absolute -bottom-4 top-0 w-px",
                    "bg-vertical-dashed",
                    "-translate-x-1/2",
                    date === "now" && "top-1/2",
                    last && "-bottom-8",
                  )}
                />

                {date === "now" && (
                  <>
                    <span
                      className={cn(
                        "absolute -bottom-8 top-3/4 z-10 w-px",
                        "bg-gradient-to-b from-spotify to-transparent backdrop-blur-sm",
                        "-translate-x-1/2",
                      )}
                    />
                    <div
                      className={cn(
                        "absolute left-0 top-1/2 z-20 flex size-4 items-center justify-center",
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
                      <span
                        className={cn(
                          "absolute size-3 rounded-full",
                          "bg-background",
                        )}
                      />
                      <span
                        className={cn(
                          "absolute size-12 rounded-full",
                          "bg-spotify/40 blur-xl",
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
                      transition={{ duration: 0.8 }}
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
                      transition={{
                        duration: 0.6,
                      }}
                      viewport={{ once: true }}
                      className="flex"
                    >
                      <div
                        className={cn(
                          "overflow-hidden text-ellipsis whitespace-nowrap",
                        )}
                      >
                        <StyledLink href={item.trackUrl}>
                          {item.name}
                        </StyledLink>

                        <div
                          className={cn(
                            "overflow-hidden text-ellipsis whitespace-nowrap text-xs",
                            "text-secondary",
                          )}
                        >
                          <Artists artists={item.artists} />
                        </div>
                      </div>
                    </MotionLi>
                  ),
                )}
              </ul>
            </div>
          );
        })}
      </MotionDiv>
    </Container>
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

function groupTracksByDate(player: Player): Record<string, TimelineItem[]> {
  const grouped: Record<string, TimelineItem[]> = {};

  const { nowPlaying, recentlyPlayed } = player;

  if (nowPlaying?.currentlyPlaying) {
    grouped["now"] = [nowPlaying];
  }

  recentlyPlayed!.forEach((track) => {
    const playedAtDate = `D+${differenceInDays(
      new Date(),
      new Date(track.playedAt!),
    )}`;

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
                "absolute -left-[53%] -right-1/2 top-1/2 h-px",
                "bg-horizontal-dashed",
                "-translate-y-1/2",
                "md:right-0",
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
