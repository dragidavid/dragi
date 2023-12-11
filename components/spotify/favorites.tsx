"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";

import Artists from "components/spotify/artists";

import Heading from "components/heading";
import StyledLink from "components/styled-link";

import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "components/primitives/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "components/primitives/select";
import { Skeleton } from "components/primitives/skeleton";

import { cn } from "lib/cn";
import { fetcher } from "lib/fetcher";

import { type Track } from "lib/types";

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
  } = useSWR<Track[]>(
    `/api/spotify/favorites?range=${localSelectedRange}`,
    fetcher,
    {
      refreshInterval: 90000,
      revalidateOnFocus: false,
      errorRetryCount: 2,
    },
  );

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

      {favoritesError ? (
        <div
          className={cn("flex justify-center pt-8 text-sm", "text-secondary")}
        >
          <p>Something went wrong...</p>
        </div>
      ) : (
        <Table className="table-fixed">
          <TableCaption>
            Most played tracks in the {map[localSelectedRange]}.
          </TableCaption>
          <TableHeader>
            <TableRow className={cn("font-black", "border-accent")}>
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
              : favorites?.map((track, index) => (
                  <TableRow key={track.id} className="border-none">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell title={track.name}>
                      <div className={cn("flex gap-3")}>
                        <Image
                          src={track.album.image}
                          width={40}
                          height={40}
                          priority
                          alt="album-image"
                          className={cn("h-10 w-10")}
                        />

                        <div
                          className={cn(
                            "flex w-[calc(100%-40px-12px)] flex-col justify-center",
                          )}
                        >
                          <div
                            className={cn(
                              "overflow-hidden text-ellipsis whitespace-nowrap text-sm",
                            )}
                          >
                            <StyledLink href={track.trackUrl}>
                              {track.name}
                            </StyledLink>
                          </div>

                          <div
                            className={cn(
                              "overflow-hidden text-ellipsis whitespace-nowrap text-xs",
                            )}
                          >
                            <Artists artists={track.artists} />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
