"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";

import Link from "components/Spotify/Link";
import Artists from "components/Spotify/Artists";

import Heading from "components/ui/Heading";

import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "components/ui/primitives/Table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "components/ui/primitives/Select";
import { Skeleton } from "components/ui/primitives/Skeleton";

import { cn } from "lib/cn";
import { fetcher } from "lib/fetcher";

const map = {
  short_term: "last 4 weeks",
  medium_term: "last 6 months",
  long_term: "last year",
};

export default function Favorites() {
  const [localSelectedRange, setLocalSelectedRange] =
    useState<keyof typeof map>("short_term");

  const {
    data: favorites,
    isLoading: favoritesLoading,
    error: favoritesError,
  } = useSWR(`/api/spotify/favorites?range=${localSelectedRange}`, fetcher, {
    revalidateOnFocus: false,
  });

  return (
    <div className={cn("flex flex-col pb-6")}>
      <div className={cn("flex w-full items-center justify-between p-6")}>
        <Heading>Favorites</Heading>

        <div>
          <Select
            value={localSelectedRange}
            onValueChange={(value: keyof typeof map) =>
              setLocalSelectedRange(value)
            }
          >
            <SelectTrigger
              className={cn("w-36", "border-none")}
              aria-label="date_range"
            >
              <SelectValue>{map[localSelectedRange]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(map).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table className="table-fixed">
        <TableCaption>
          Most played tracks in the {map[localSelectedRange]}.
        </TableCaption>
        <TableHeader>
          <TableRow className={cn("font-black", "border-accent/90")}>
            <TableHead className="w-11">#</TableHead>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {favoritesLoading
            ? [...Array(10)].map((_, index) => (
                <TableRow key={index} className="border-none">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className={cn("flex gap-3")}>
                      <Skeleton className={cn("h-[40px] w-[40px]")} />

                      <div
                        className={cn(
                          "flex w-[calc(100%-40px-12px)] flex-col justify-between",
                        )}
                      >
                        <Skeleton
                          className="h-[20px]"
                          styles={{
                            width: `78%`,
                          }}
                        />
                        <Skeleton
                          className="h-[17px]"
                          styles={{
                            width: `33%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : favorites?.map(
                (
                  track: {
                    id: string;
                    name: string;
                    trackUrl: string;
                    album: { image: string };
                    artists: { id: string; artistUrl: string; name: string }[];
                  },
                  index: number,
                ) => (
                  <TableRow key={track.id} className="border-none">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell title={track.name}>
                      <div className={cn("flex gap-3")}>
                        <Image
                          src={track.album.image}
                          width={40}
                          height={40}
                          alt="album-image"
                        />

                        <div
                          className={cn(
                            "flex w-[calc(100%-40px-12px)] flex-col justify-center",
                          )}
                        >
                          <div
                            className={cn(
                              "overflow-hidden text-ellipsis whitespace-nowrap text-base",
                            )}
                          >
                            <Link href={track.trackUrl} label={track.name} />
                          </div>

                          <div
                            className={cn(
                              "overflow-hidden text-ellipsis whitespace-nowrap",
                            )}
                          >
                            <Artists artists={track.artists} />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ),
              )}
        </TableBody>
      </Table>
    </div>
  );
}
