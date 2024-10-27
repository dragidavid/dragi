import { NextResponse } from "next/server";

import { getNowPlaying, getRecentlyPlayed } from "lib/api/spotify";

import { blur, placeholder } from "lib/blur";

import type { SpotifyTrackResponse, Track, Player } from "lib/types";

function format(
  item: SpotifyTrackResponse & { is_playing?: boolean; played_at?: string },
  blurHash: string,
): Track {
  return {
    type: "track",
    id: item.id,
    currentlyPlaying: item.is_playing ?? undefined,
    name: item.name,
    trackUrl: item.external_urls.spotify,
    playedAt: item.played_at ?? undefined,
    artists: item.artists.map(
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
      id: item.album.id,
      name: item.album.name,
      image: item.album.images[1].url,
      imageBlurHash: blurHash ?? placeholder,
      albumUrl: item.album.external_urls.spotify,
    },
  };
}

async function fetchRecentlyPlayed() {
  const recentlyPlayed = await getRecentlyPlayed();

  if (recentlyPlayed.status > 400) {
    throw new Error("Failed to fetch recently played tracks");
  }

  const recentlyPlayedResponse = await recentlyPlayed.json();
  const recentlyPlayedBlurHash = await blur(
    recentlyPlayedResponse.items[0].track.album.images[1].url,
  );

  return {
    recentlyPlayedResponse,
    recentlyPlayedBlurHash,
  };
}

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export async function GET() {
  try {
    const nowPlaying = await getNowPlaying();

    if (nowPlaying.status === 204) {
      const { recentlyPlayedResponse, recentlyPlayedBlurHash } =
        await fetchRecentlyPlayed();

      return NextResponse.json<Player>(
        {
          nowPlaying: null,
          recentlyPlayed: recentlyPlayedResponse.items.map(
            (
              item: {
                track: SpotifyTrackResponse;
                played_at: string;
              },
              i: number,
            ) =>
              format(
                { ...item.track, played_at: item.played_at },
                i === 0 ? recentlyPlayedBlurHash : placeholder,
              ),
          ),
        },
        {
          status: 200,
        },
      );
    }

    const nowPlayingResponse = await nowPlaying.json();
    const nowPlayingBlurHash = await blur(
      nowPlayingResponse.item.album.images[1].url,
    );

    const { recentlyPlayedResponse, recentlyPlayedBlurHash } =
      await fetchRecentlyPlayed();

    return NextResponse.json<Player>(
      {
        nowPlaying: format(
          {
            ...nowPlayingResponse.item,
            is_playing: nowPlayingResponse.is_playing,
          },
          nowPlayingBlurHash,
        ),
        recentlyPlayed: recentlyPlayedResponse.items.map(
          (
            item: {
              track: SpotifyTrackResponse;
              played_at: string;
            },
            i: number,
          ) =>
            format(
              { ...item.track, played_at: item.played_at },
              i === 0 ? recentlyPlayedBlurHash : placeholder,
            ),
        ),
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error('Spotify API Error:', e);
    
    return NextResponse.json(
      {
        code: "INTERNAL_SERVER_ERROR",
        message: e instanceof Error ? e.message : 'Unknown error occurred',
      },
      {
        status: 500,
      },
    );
  }
