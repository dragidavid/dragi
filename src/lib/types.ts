import type { AuraColor } from "@drgd/aura";

export type Track = {
  type: "track";
  currentlyPlaying?: boolean;
  id: string;
  name: string;
  trackUrl: string;
  playedAt?: string;
  colors?: AuraColor[];
  artists: Artist[];
  album: Album;
};

export type Artist = {
  id: string;
  name: string;
  artistUrl: string;
};

export type Album = {
  id: string;
  name: string;
  image: string;
  albumUrl: string;
};

export type SpotifyTrackResponse = {
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

export type Player = {
  nowPlaying: Track | null;
  recentlyPlayed: Track[] | null;
};
