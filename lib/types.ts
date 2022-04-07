import { GRADIENTS } from "lib/entities";

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
  id: string;
  component: JSX.Element;
};

export type Gradients = {
  [key in keyof typeof GRADIENTS]: { [key: string]: string };
};
