// App Types
export type Artist = {
  id: string;
  name: string;
  artistUrl: string;
};

export type Album = {
  id: string;
  name: string;
  image: string;
  imageBlurHash: string;
  albumUrl: string;
};

export type Track = {
  type: "track";
  currentlyPlaying?: boolean;
  id: string;
  name: string;
  trackUrl: string;
  playedAt?: string;
  artists: Artist[];
  album: Album;
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

// UI Types
export type Color = {
  name: string;
  hex: string;
};

export type TimelineGap = {
  type: "gap";
  content?: JSX.Element;
  height: number;
};

export type TimelineItem = Track | TimelineGap;

export type Corner = "tl" | "tr" | "bl" | "br";

export type Side = "top" | "right" | "bottom" | "left";
