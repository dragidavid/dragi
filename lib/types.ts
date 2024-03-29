import { GRADIENTS } from "lib/gradients";

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

export type StatDetails = {
  display: string;
  value: number | string;
};

export type Stats = {
  currentStreak: StatDetails;
  longestStreak: StatDetails;
  contributionsThisYear: StatDetails;
  totalContributions: StatDetails;
  firstContribution: StatDetails;
};

export type GAEventDetails = {
  action: string;
  category: string;
  label: string;
  value?: number;
};
