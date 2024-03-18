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

export type CrossPosition = "tl" | "tr" | "bl" | "br";

export type Side = "top" | "right" | "bottom" | "left";
