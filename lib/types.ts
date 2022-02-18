export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type Color = {
  name: string;
  hex: string;
  population: number;
};

export type Category = {
  label: string;
};

export type GridTile = {
  key: string;
  component: JSX.Element;
};

export type RowHeight = {
  xl: number;
  lg: number;
  md: number;
  sm: number;
};
