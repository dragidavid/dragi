import Vibrant from "node-vibrant";
import { invoke } from "lodash";

import type { Color } from "lib/types";

export async function colors(src: string): Promise<Color[]> {
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
}
