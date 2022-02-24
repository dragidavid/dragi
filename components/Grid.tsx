import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";

import Bio from "components/Bio";
import Spotify from "components/Spotify";
import Map from "components/Map";
import Contact from "components/Contact";

import { GridTile, RowHeights } from "lib/types";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ROWHEIGHTS: RowHeights = {
  xl: 300,
  lg: 236,
  md: 216,
  sm: 176,
};

const BREAKPOINTS = {
  xl: 1279,
  lg: 1023,
  md: 479,
  sm: 399,
};

const TILES: GridTile[] = [
  {
    key: "bio",
    component: <Bio />,
  },
  {
    key: "spotify",
    component: <Spotify />,
  },
  {
    key: "fill-one",
    component: (
      <div className="relative flex h-full items-center justify-center bg-sky-900 text-6xl">
        <h2>🚧</h2>
      </div>
    ),
  },
  {
    key: "fill-two",
    component: (
      <div className="relative flex h-full items-center justify-center bg-sky-900 text-6xl">
        <h2>🚧</h2>
      </div>
    ),
  },
  {
    key: "fill-three",
    component: (
      <div className="relative flex h-full items-center justify-center bg-sky-900 text-6xl">
        <h2>🚧</h2>
      </div>
    ),
  },
  {
    key: "map",
    component: <Map />,
  },
  {
    key: "contact",
    component: <Contact />,
  },
];

const determineRowHeight = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth > 1279) return ROWHEIGHTS.xl;
    if (window.innerWidth > 1023 && window.innerWidth < 1280)
      return ROWHEIGHTS.lg;
    if (window.innerWidth > 767 && window.innerWidth < 1024)
      return ROWHEIGHTS.md;
    if (window.innerWidth < 768) return ROWHEIGHTS.sm;
  }
};

export default function Grid() {
  const [rowHeight, setRowHeight] = useState(determineRowHeight);

  const layouts = {
    xl: [
      { i: "bio", x: 0, y: 0, w: 2, h: 1, isResizable: false },
      { i: "spotify", x: 2, y: 0, w: 1, h: 1, isResizable: false },
      { i: "fill-one", x: 3, y: 0, w: 1, h: 2, isResizable: false },
      { i: "fill-two", x: 0, y: 1, w: 1, h: 2, isResizable: false },
      { i: "fill-three", x: 1, y: 1, w: 1, h: 2, isResizable: false },
      { i: "map", x: 2, y: 1, w: 1, h: 1, isResizable: false },
      { i: "contact", x: 2, y: 3, w: 2, h: 1, isResizable: false },
    ],
    md: [
      { i: "bio", x: 0, y: 0, w: 2, h: 1, static: true },
      { i: "map", x: 0, y: 1, w: 2, h: 1, static: true },
      { i: "fill-one", x: 0, y: 2, w: 1, h: 2, static: true },
      { i: "fill-two", x: 1, y: 2, w: 1, h: 1, static: true },
      { i: "fill-three", x: 1, y: 3, w: 1, h: 1, static: true },
      { i: "spotify", x: 0, y: 4, w: 2, h: 1, static: true },
      { i: "contact", x: 0, y: 5, w: 2, h: 1, static: true },
    ],
    sm: [
      { i: "bio", x: 0, y: 0, w: 2, h: 2, static: true },
      { i: "map", x: 0, y: 2, w: 2, h: 1, static: true },
      { i: "fill-one", x: 0, y: 3, w: 1, h: 2, static: true },
      { i: "fill-two", x: 1, y: 3, w: 1, h: 1, static: true },
      { i: "fill-three", x: 1, y: 4, w: 1, h: 1, static: true },
      { i: "spotify", x: 0, y: 5, w: 2, h: 2, static: true },
      { i: "contact", x: 0, y: 7, w: 2, h: 2, static: true },
    ],
  };

  return (
    <motion.main
      className="container mx-auto max-w-[400px] grow md:max-w-[480px] lg:max-w-[1024px] xl:max-w-[1280px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <ResponsiveGridLayout
        layouts={layouts}
        breakpoints={BREAKPOINTS}
        cols={{ xl: 4, lg: 4, md: 2, sm: 2 }}
        rowHeight={rowHeight}
        isBounded={true}
        margin={[16, 16]}
        onBreakpointChange={(breakpoint: string) =>
          setRowHeight(ROWHEIGHTS[breakpoint])
        }
        measureBeforeMount={true}
        className="-mt-4"
      >
        {TILES.map((tile: GridTile) => (
          <div
            className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-500 ease-in-out will-change-transform dark:bg-slate-900 dark:ring-2 dark:ring-inset dark:ring-slate-700 lg:hover:cursor-grab"
            key={tile.key}
          >
            {tile.component}
          </div>
        ))}
      </ResponsiveGridLayout>
    </motion.main>
  );
}
