import { GRADIENTS } from "lib/gradients";

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
  currentlyPlaying?: boolean;
  id: string;
  name: string;
  trackUrl: string;
  playedAt?: string;
  artists: Artist[];
  album: Album;
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

export type Cage = {
  id: string;
  navigationLabel: string | JSX.Element;
  styles: string;
  component?: JSX.Element;
  hasOwnPage: boolean;
  href: string;
};
