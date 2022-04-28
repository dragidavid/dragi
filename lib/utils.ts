import Vibrant from "node-vibrant";
import { invoke } from "lodash";

import type { Color } from "lib/types";

export const getColors = async (src: string): Promise<Color[]> => {
  const palette = await Vibrant.from(src).getPalette();

  const createColorsArray = (acc: Color[], color: string) => {
    if (invoke(palette, [color, "getPopulation"]) > 0) {
      return [
        ...acc,
        {
          name: color,
          hex: invoke(palette, [color, "getHex"]) as string,
        },
      ];
    }

    return [...acc];
  };

  return Object.keys(palette).reduce(createColorsArray, []);
};

export const randomNumber = (
  from: number,
  to: number,
  float: boolean = false
): number => {
  if (float) return +(Math.random() * (to - from) + from).toFixed(2);

  return Math.floor(Math.random() * (to - from) + from);
};

export const randomArray = (
  length: number,
  from: number,
  to: number,
  float: boolean = false
): number[] => {
  if (float) {
    return Array.from({ length }, () => randomNumber(from, to, float));
  }

  return Array.from({ length }, () => randomNumber(from, to, float));
};

export const normalizeUtc = (date: Date): Date => {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};
