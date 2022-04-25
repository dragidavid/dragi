import type { NextApiRequest, NextApiResponse } from "next";

import { getNowPlaying } from "lib/api/spotify";

import type { Track } from "lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Track>>
) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const track = await response.json();

  if (track.item === null) {
    return res.status(200).json({ isPlaying: false });
  }

  const isPlaying = track.is_playing;
  const title = track.item.name;
  const artist = track.item.artists
    .map((_artist: any) => _artist.name)
    .join(", ");
  const album = track.item.album.name;
  const albumImageUrl = track.item.album.images[1].url;
  const trackUrl = track.item.external_urls.spotify;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=30"
  );

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    trackUrl,
    title,
  });
}
