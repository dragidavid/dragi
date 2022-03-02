export type Track = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  trackUrl: string;
  title: string;
};

export type Color = {
  name: string;
  hex: string;
};

export type Category = {
  label: string;
};

export type GridTile = {
  key: string;
  component: JSX.Element;
};

export type RowHeights = {
  [breakpoint: string]: number;
};
