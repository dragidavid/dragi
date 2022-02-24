import Vibrant from "node-vibrant";
import { invoke } from "lodash";

import { Color } from "lib/types";

export async function getColors(src: string) {
  const palette = await Vibrant.from(src).getPalette();

  const makeNice = (acc: Color[], color: string) => {
    if (invoke(palette, [color, "getPopulation"]) > 0) {
      return [
        ...acc,
        {
          name: color,
          hex: invoke(palette, [color, "getHex"]),
        },
      ];
    }

    return [...acc];
  };

  return Object.keys(palette).reduce(makeNice, []);
}

export function randomNumber(
  from: number,
  to: number,
  float: boolean = false
): number {
  if (float) return +(Math.random() * (to - from) + from).toFixed(2);

  return Math.floor(Math.random() * (to - from) + from);
}

export function randomArray(
  length: number,
  from: number,
  to: number,
  float: boolean = false
): number[] {
  if (float) {
    return Array.from({ length }, () => randomNumber(from, to, float));
  }

  return Array.from({ length }, () => randomNumber(from, to, float));
}
