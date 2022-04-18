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

export type GridTile = {
  id: keyof typeof GRADIENTS;
  component: JSX.Element;
};

export type Gradients = typeof GRADIENTS;

type StatDetails = {
  display: string;
  value: number;
};

export type Stats = {
  currentStreak: StatDetails;
  longestStreak: StatDetails;
  contributionsThisYear: StatDetails;
  totalContributions: StatDetails;
};
