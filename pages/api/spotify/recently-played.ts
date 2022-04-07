import type { NextApiRequest, NextApiResponse } from "next";

import { getRecentlyPlayed } from "lib/spotify";

import { Track } from "lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Track>>
) {
  const response = await getRecentlyPlayed();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const recents = await response.json();

  const mostRecentTrack = recents.items[0].track;

  const title = mostRecentTrack.name;
  const artist = mostRecentTrack.artists
    .map((_artist: any) => _artist.name)
    .join(", ");
  const album = mostRecentTrack.album.name;
  const trackUrl = mostRecentTrack.external_urls.spotify;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );

  return res.status(200).json({
    album,
    artist,
    trackUrl,
    title,
  });
}
