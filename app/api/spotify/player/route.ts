import { NextResponse } from "next/server";

import { getNowPlaying, getRecentlyPlayed } from "lib/api/spotify";

import { type Track } from "lib/types";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET() {
  const nowPlaying = await getNowPlaying();

  if (nowPlaying.status > 400) {
    return NextResponse.json(
      {
        code: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      },
    );
  }

  if (nowPlaying.status !== 204) {
    const nowPlayingResponse = await nowPlaying.json();

    if (nowPlayingResponse.is_playing) {
      return NextResponse.json(
        {
          currentlyPlaying: true,
          id: nowPlayingResponse.item.id,
          name: nowPlayingResponse.item.name,
          trackUrl: nowPlayingResponse.item.external_urls.spotify,
          artists: nowPlayingResponse.item.artists.map(
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
            id: nowPlayingResponse.item.album.id,
            name: nowPlayingResponse.item.album.name,
            image: nowPlayingResponse.item.album.images[1].url,
            albumUrl: nowPlayingResponse.item.album.external_urls.spotify,
          },
        },
        {
          status: 200,
        },
      );
    }
  }

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

  const mostRecent = recentlyPlayedResponse.items.at(0);

  return NextResponse.json<Track>(
    {
      currentlyPlaying: false,
      id: mostRecent.track.id,
      name: mostRecent.track.name,
      trackUrl: mostRecent.track.external_urls.spotify,
      playedAt: mostRecent.played_at,
      artists: mostRecent.track.artists.map(
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
        id: mostRecent.track.album.id,
        name: mostRecent.track.album.name,
        image: mostRecent.track.album.images[1].url,
        albumUrl: mostRecent.track.album.external_urls.spotify,
      },
    },
    {
      status: 200,
    },
  );
}
