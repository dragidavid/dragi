import { atomWithStorage } from "jotai/utils";

import { type Track } from "lib/types";

const glassAtom = atomWithStorage("showGlass", true);
const blurAtom = atomWithStorage("showBlur", true);
const noiseAtom = atomWithStorage("showNoise", true);
const albumImageAtom = atomWithStorage("showAlbumImage", false);
const playerTrackAtom = atomWithStorage<Track | null>("playerTrack", null);

export { glassAtom, blurAtom, noiseAtom, albumImageAtom, playerTrackAtom };
