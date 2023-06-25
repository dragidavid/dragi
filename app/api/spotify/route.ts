import { NextResponse } from "next/server";

import { getNowPlaying, getRecentlyPlayed } from "lib/api/spotify";

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
      }
    );
  }

  const nowPlayingResponse = await nowPlaying.json();

  if (nowPlayingResponse.is_playing) {
    return NextResponse.json(
      {
        currentlyPlaying: true,
        id: nowPlayingResponse.item.id,
        title: nowPlayingResponse.item.name,
        artists: nowPlayingResponse.item.artists.map(
          (artist: {
            id: string;
            name: string;
            external_urls: { spotify: string };
          }) => ({
            id: artist.id,
            name: artist.name,
            artistUrl: artist.external_urls.spotify,
          })
        ),
        albumImageUrl: nowPlayingResponse.item.album.images[1].url,
        trackUrl: nowPlayingResponse.item.external_urls.spotify,
      },
      {
        status: 200,
      }
    );
  }

  const recentlyPlayed = await getRecentlyPlayed();

  if (recentlyPlayed.status > 400) {
    return NextResponse.json(
      {
        code: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      }
    );
  }

  const recentlyPlayedResponse = await recentlyPlayed.json();

  const mostRecentTrack = recentlyPlayedResponse.items.at(0).track;

  return NextResponse.json(
    {
      currentlyPlaying: false,
      id: mostRecentTrack.id,
      title: mostRecentTrack.name,
      artists: mostRecentTrack.artists.map(
        (artist: {
          id: string;
          name: string;
          external_urls: { spotify: string };
        }) => ({
          id: artist.id,
          name: artist.name,
          artistUrl: artist.external_urls.spotify,
        })
      ),
      albumImageUrl: mostRecentTrack.album.images[1].url,
      trackUrl: mostRecentTrack.external_urls.spotify,
    },
    {
      status: 200,
    }
  );
}
