"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";

import Artists from "components/Spotify/Artists";

import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "components/ui/primitives/Table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "components/ui/primitives/Select";

import { cn } from "lib/cn";
import { fetcher } from "lib/fetcher";

export default function TopTracks() {
  const [localSelectedRange, setLocalSelectedRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");

  const { data: topTracks } = useSWR(
    `/api/spotify/top?range=${localSelectedRange}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div className={cn("flex flex-col")}>
      <div className={cn("flex w-full justify-between")}>
        <h1 className={cn("text-4xl font-black")}>Top tracks</h1>

        <div>
          <Select
            defaultValue={localSelectedRange}
            value={localSelectedRange}
            onValueChange={(
              value: "short_term" | "medium_term" | "long_term"
            ) => setLocalSelectedRange(value)}
          >
            <SelectTrigger className={cn("w-36", "border-none")}>
              <SelectValue>{localSelectedRange}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="short_term">Short term</SelectItem>
                <SelectItem value="medium_term">Medium term</SelectItem>
                <SelectItem value="long_term">Long term</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="font-black">
            <TableHead className="w-11">#</TableHead>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topTracks?.map(
            (
              track: {
                id: string;
                name: string;
                trackUrl: string;
                album: { image: string };
                artists: { id: string; artistUrl: string; name: string }[];
              },
              index: number
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
                        "flex w-[calc(100%-40px-12px)] flex-col justify-center"
                      )}
                    >
                      <div
                        className={cn(
                          "overflow-hidden text-ellipsis whitespace-nowrap text-base"
                        )}
                      >
                        <a
                          href={track.trackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "hover:cursor-ne-resize hover:underline"
                          )}
                        >
                          {track.name}
                        </a>
                      </div>

                      <div
                        className={cn(
                          "overflow-hidden text-ellipsis whitespace-nowrap",
                          "text-secondary"
                        )}
                      >
                        <Artists artists={track.artists} />
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
