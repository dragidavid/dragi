import { type NextRequest, NextResponse } from "next/server";

import { getTopTracks } from "lib/api/spotify";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range");

  if (!range) {
    return NextResponse.json(
      {
        code: "MISSING_RANGE",
      },
      {
        status: 400,
      }
    );
  }

  const topTracks = await getTopTracks(
    range as "short_term" | "medium_term" | "long_term"
  );

  if (topTracks.status > 400) {
    return NextResponse.json(
      {
        code: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      }
    );
  }

  const topTracksResponse = await topTracks.json();

  return NextResponse.json(
    [
      ...topTracksResponse.items.map(
        (track: {
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
        }) => ({
          id: track.id,
          name: track.name,
          trackUrl: track.external_urls.spotify,
          artists: track.artists.map((artist: any) => ({
            id: artist.id,
            name: artist.name,
            artistUrl: artist.external_urls.spotify,
          })),
          album: {
            id: track.album.id,
            name: track.album.name,
            image: track.album.images[1].url,
            albumUrl: track.album.external_urls.spotify,
          },
        })
      ),
    ],
    {
      status: 200,
    }
  );
}
