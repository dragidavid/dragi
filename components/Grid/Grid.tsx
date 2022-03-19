import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";

import Tile from "components/Grid/Tile";

import Bio from "components/Bio";
import Spotify from "components/Spotify";
import Projects from "components/Projects";
import Switch from "components/Switch";
import TBD from "components/TBD";
import Map from "components/Map";
import Contact from "components/Contact";

import { GridTile } from "lib/types";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ROWHEIGHTS: { [key: string]: number } = {
  lg: 283,
  md: 213,
  sm: 173,
};

const BREAKPOINTS = {
  lg: 919,
  md: 479,
  sm: 399,
};

const TILES: GridTile[] = [
  {
    id: "bio",
    component: <Bio />,
  },
  {
    id: "spotify",
    component: <Spotify />,
  },
  {
    id: "projects",
    component: <Projects />,
  },
  {
    id: "switch",
    component: <Switch />,
  },
  {
    id: "map",
    component: <Map />,
  },
  {
    id: "tbd",
    component: <TBD />,
  },
  {
    id: "contact",
    component: <Contact />,
  },
];

const LAYOUTS = {
  lg: [
    { i: "bio", x: 0, y: 0, w: 2, h: 1, isResizable: false },
    { i: "spotify", x: 2, y: 0, w: 1, h: 1, isResizable: false },
    { i: "projects", x: 0, y: 1, w: 1, h: 2, isResizable: false },
    { i: "switch", x: 1, y: 1, w: 1, h: 1, isResizable: false },
    { i: "map", x: 2, y: 1, w: 1, h: 1, isResizable: false },
    { i: "tbd", x: 1, y: 2, w: 1, h: 1, isResizable: false },
    { i: "contact", x: 2, y: 2, w: 1, h: 1, isResizable: false },
  ],
  md: [
    { i: "bio", x: 0, y: 0, w: 2, h: 1.5, static: true },
    { i: "map", x: 0, y: 1.5, w: 2, h: 1, static: true },
    { i: "switch", x: 0, y: 2.5, w: 1, h: 1, static: true },
    { i: "tbd", x: 1, y: 2.5, w: 1, h: 1, static: true },
    { i: "spotify", x: 0, y: 3.5, w: 2, h: 1, static: true },
    { i: "contact", x: 0, y: 4.5, w: 2, h: 1, static: true },
    { i: "projects", x: 0, y: 5.5, w: 2, h: 1.5, static: true },
  ],
  sm: [
    { i: "bio", x: 0, y: 0, w: 2, h: 2, static: true },
    { i: "map", x: 0, y: 2, w: 2, h: 1.5, static: true },
    { i: "switch", x: 0, y: 3.5, w: 1, h: 1, static: true },
    { i: "tbd", x: 1, y: 3.5, w: 1, h: 1, static: true },
    { i: "spotify", x: 0, y: 4.5, w: 2, h: 1.5, static: true },
    { i: "contact", x: 0, y: 6, w: 2, h: 1.5, static: true },
    { i: "projects", x: 0, y: 7.5, w: 2, h: 1.5, static: true },
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

  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full max-w-[400px] py-8 md:max-w-[480px] lg:max-w-[920px]">
        <ResponsiveGridLayout
          layouts={LAYOUTS}
          breakpoints={BREAKPOINTS}
          cols={{ lg: 3, md: 2, sm: 2 }}
          rowHeight={rowHeight}
          isBounded={true}
          margin={[18, 18]}
          useCSSTransforms={false}
          onBreakpointChange={(breakpoint: string) =>
            setRowHeight(ROWHEIGHTS[breakpoint])
          }
          measureBeforeMount={true}
        >
          {TILES.map((tile: GridTile, i: number) => (
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
