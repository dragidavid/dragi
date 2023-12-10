import { atomWithStorage } from "jotai/utils";

import { type Track } from "lib/types";

const fractalGlassAtom = atomWithStorage("showFractalGlass", true);
const blurAtom = atomWithStorage("showBlur", true);
const noiseAtom = atomWithStorage("showNoise", true);
const albumImageAtom = atomWithStorage("showAlbumImage", false);
const playerTrackAtom = atomWithStorage<Track | null>("playerTrack", null);

export {
  fractalGlassAtom,
  blurAtom,
  noiseAtom,
  albumImageAtom,
  playerTrackAtom,
};
