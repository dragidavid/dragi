import { getNowPlaying, getRecentlyPlayed } from "lib/api/spotify";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler() {
  const getNowPlayingResponse = await getNowPlaying();

  if (
    getNowPlayingResponse.status === 204 ||
    getNowPlayingResponse.status > 400
  ) {
    const recentlyPlayedResponse = await getRecentlyPlayed();

    if (
      recentlyPlayedResponse!.status === 204 ||
      recentlyPlayedResponse!.status > 400
    ) {
      return new Response(
        JSON.stringify({
          currentlyPlaying: false,
          error: "Something went wrong.",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }

    const mostRecentTrack = (await recentlyPlayedResponse.json()).items[0]
      .track;

    const id = mostRecentTrack.id;
    const title = mostRecentTrack.name;
    const artists = mostRecentTrack.artists.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      artistUrl: artist.external_urls.spotify,
    }));
    const trackUrl = mostRecentTrack.external_urls.spotify;

    return new Response(
      JSON.stringify({ currentlyPlaying: false, id, title, artists, trackUrl }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  }

  const currentTrack = await getNowPlayingResponse.json();

  if (currentTrack.item === null) {
    return new Response(
      JSON.stringify({
        currentlyPlaying: false,
        error: "Something went wrong.",
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  const id = currentTrack.item.id;
  const title = currentTrack.item.name;
  const artists = currentTrack.item.artists.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    artistUrl: artist.external_urls.spotify,
  }));
  const trackUrl = currentTrack.item.external_urls.spotify;

  return new Response(
    JSON.stringify({ currentlyPlaying: true, id, title, artists, trackUrl }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    }
  );
}
