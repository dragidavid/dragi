import { atomWithStorage } from "jotai/utils";

import { type Track } from "lib/types";

const albumImageAtom = atomWithStorage("showAlbumImage", false);
const blurAtom = atomWithStorage("showBlur", true);
const noiseAtom = atomWithStorage("showNoise", true);
const glassAtom = atomWithStorage("showGlass", true);

const playerTrackAtom = atomWithStorage<Track | null>("playerTrack", null);

export { albumImageAtom, blurAtom, noiseAtom, glassAtom, playerTrackAtom };
