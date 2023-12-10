import { NextResponse } from "next/server";

import { getRecentlyPlayed } from "lib/api/spotify";

import { type Track } from "lib/types";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET() {
  const recentlyPlayed = await getRecentlyPlayed();

  if (recentlyPlayed.status > 400) {
    return NextResponse.json(
      {
        code: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      },
    );
  }

  const recentlyPlayedResponse = await recentlyPlayed.json();

  return NextResponse.json<Track[]>(
    [
      ...recentlyPlayedResponse.items.map(
        ({
          track,
          played_at,
        }: {
          track: {
            id: string;
            name: string;
            external_urls: { spotify: string };
            artists: {
              id: string;
              name: string;
              external_urls: { spotify: string };
            }[];
            album: {
              id: string;
              name: string;
              images: { url: string }[];
              external_urls: { spotify: string };
            };
          };
          played_at: string;
        }) => ({
          type: "track",
          id: track.id,
          name: track.name,
          trackUrl: track.external_urls.spotify,
          playedAt: played_at,
          artists: track.artists.map(
            (artist: {
              id: string;
              name: string;
              external_urls: { spotify: string };
            }) => ({
              id: artist.id,
              name: artist.name,
              artistUrl: artist.external_urls.spotify,
            }),
          ),
          album: {
            id: track.album.id,
            name: track.album.name,
            image: track.album.images[1].url,
            albumUrl: track.album.external_urls.spotify,
          },
        }),
      ),
    ],
    {
      status: 200,
    },
  );
}
