import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";

import Tile from "components/Grid/Tile";

import { useLayoutContext } from "contexts/LayoutContext";

import type { Layouts } from "react-grid-layout";
import type { GridTile } from "lib/types";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ROWHEIGHTS: { [key: string]: number } = {
  lg: 132.5,
  md: 97.5,
  sm: 77.5,
};

const BREAKPOINTS: { [key: string]: number } = {
  lg: 919,
  md: 479,
  sm: 399,
};

const LAYOUTS: Layouts = {
  lg: [
    { i: "bio", x: 0, y: 0, w: 2, h: 2, isResizable: false },
    { i: "spotify", x: 2, y: 0, w: 1, h: 2, isResizable: false },
    { i: "projects", x: 0, y: 2, w: 1, h: 4, isResizable: false },
    { i: "switch", x: 1, y: 2, w: 1, h: 1, isResizable: false },
    { i: "map", x: 2, y: 2, w: 1, h: 2, isResizable: false },
    { i: "activity", x: 1, y: 4, w: 1, h: 3, isResizable: false },
    { i: "contact", x: 4, y: 2, w: 1, h: 2, isResizable: false },
  ],
  md: [
    { i: "bio", x: 0, y: 0, w: 2, h: 3, static: true },
    { i: "map", x: 0, y: 3, w: 2, h: 2, static: true },
    { i: "switch", x: 0, y: 5, w: 1, h: 2, static: true },
    { i: "contact", x: 1, y: 5, w: 1, h: 2, static: true },
    { i: "spotify", x: 0, y: 7, w: 2, h: 2, static: true },
    { i: "activity", x: 0, y: 9, w: 2, h: 2, static: true },
    { i: "projects", x: 0, y: 11, w: 2, h: 3, static: true },
  ],
  sm: [
    { i: "bio", x: 0, y: 0, w: 2, h: 4, static: true },
    { i: "map", x: 0, y: 4, w: 2, h: 3, static: true },
    { i: "switch", x: 0, y: 7, w: 1, h: 2, static: true },
    { i: "contact", x: 1, y: 7, w: 1, h: 2, static: true },
    { i: "spotify", x: 0, y: 9, w: 2, h: 3, static: true },
    { i: "activity", x: 0, y: 12, w: 2, h: 3, static: true },
    { i: "projects", x: 0, y: 15, w: 2, h: 3, static: true },
  ],
};

const determineRowHeight = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth > 1023) return ROWHEIGHTS.lg;
    if (window.innerWidth > 767 && window.innerWidth < 1024)
      return ROWHEIGHTS.md;
    if (window.innerWidth < 768) return ROWHEIGHTS.sm;
  }
};

const Grid = () => {
  const [rowHeight, setRowHeight] = useState<number | undefined>(
    determineRowHeight
  );

  const { tiles, isDraggable } = useLayoutContext();

  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full max-w-[400px] py-8 md:max-w-[480px] lg:max-w-[920px]">
        <ResponsiveGridLayout
          layouts={LAYOUTS}
          breakpoints={BREAKPOINTS}
          cols={{ lg: 3, md: 2, sm: 2 }}
          rowHeight={rowHeight}
          isBounded={true}
          isDraggable={isDraggable}
          margin={[18, 18]}
          useCSSTransforms={false}
          onBreakpointChange={(breakpoint: string) =>
            setRowHeight(ROWHEIGHTS[breakpoint])
          }
          measureBeforeMount={true}
        >
          {tiles.map((tile: GridTile, i: number) => (
            <motion.div
              key={tile.id}
              className="transition-all duration-700 ease-out will-change-auto lg:cursor-grab"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              <Tile {...tile} />
            </motion.div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </main>
  );
};

export default Grid;
