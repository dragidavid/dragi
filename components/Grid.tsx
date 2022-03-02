import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";

import Bio from "components/Bio";
import Logo from "components/Logo";
import Spotify from "components/Spotify";
import Switch from "components/Switch";
import Map from "components/Map";
import Contact from "components/Contact";

import { GridTile, RowHeights } from "lib/types";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ROWHEIGHTS: RowHeights = {
  xl: 290,
  lg: 226,
  md: 204,
  sm: 164,
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
    component: (
      <div>
        <h2>🎵</h2>
      </div>
    ),
    // component: <Spotify />,
  },
  {
    key: "fill-one",
    component: (
      <div>
        <h2>🚧</h2>
      </div>
    ),
  },
  {
    key: "fill-two",
    component: (
      <div>
        <h2>🚧</h2>
      </div>
    ),
  },
  {
    key: "switch",
    component: <Switch />,
  },
  {
    key: "fill-three",
    component: (
      <div>
        <h2>🚧</h2>
      </div>
    ),
  },
  {
    key: "map",
    component: (
      <div>
        <h2>🗺</h2>
      </div>
    ),
    // component: <Map />,
  },
  {
    key: "contact",
    component: (
      <div>
        <h2>📨</h2>
      </div>
    ),
    // component: <Contact />,
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

const Grid = () => {
  const [rowHeight, setRowHeight] = useState(determineRowHeight);

  const layouts = {
    xl: [
      { i: "bio", x: 0, y: 0, w: 2, h: 1, static: true },
      { i: "spotify", x: 2, y: 0, w: 1, h: 1, isResizable: false },
      { i: "fill-one", x: 3, y: 0, w: 1, h: 2, isResizable: false },
      { i: "fill-two", x: 0, y: 1, w: 1, h: 2, isResizable: false },
      { i: "switch", x: 1, y: 1, w: 1, h: 1, isResizable: false },
      { i: "fill-three", x: 1, y: 2, w: 1, h: 1, isResizable: false },
      { i: "map", x: 2, y: 1, w: 1, h: 1, isResizable: false },
      { i: "contact", x: 2, y: 3, w: 2, h: 1, isResizable: false },
    ],
    md: [
      { i: "bio", x: 0, y: 0, w: 2, h: 1, static: true },
      { i: "map", x: 0, y: 1, w: 2, h: 1, static: true },
      { i: "switch", x: 0, y: 2, w: 1, h: 1, static: true },
      { i: "fill-one", x: 1, y: 2, w: 1, h: 1, static: true },
      { i: "fill-two", x: 0, y: 3, w: 1, h: 1, static: true },
      { i: "fill-three", x: 1, y: 3, w: 1, h: 1, static: true },
      { i: "spotify", x: 0, y: 4, w: 2, h: 1, static: true },
      { i: "contact", x: 0, y: 5, w: 2, h: 1, static: true },
    ],
    sm: [
      { i: "bio", x: 0, y: 0, w: 2, h: 2, static: true },
      { i: "map", x: 0, y: 2, w: 2, h: 1, static: true },
      { i: "switch", x: 0, y: 3, w: 1, h: 1, static: true },
      { i: "fill-one", x: 1, y: 3, w: 1, h: 1, static: true },
      { i: "fill-two", x: 0, y: 4, w: 1, h: 1, static: true },
      { i: "fill-three", x: 1, y: 4, w: 1, h: 1, static: true },
      { i: "spotify", x: 0, y: 5, w: 2, h: 2, static: true },
      { i: "contact", x: 0, y: 7, w: 2, h: 2, static: true },
    ],
  };

  return (
    <main className="flex grow items-center justify-center">
      <div className="container my-16 max-w-[400px] grow md:max-w-[480px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <ResponsiveGridLayout
          layouts={layouts}
          breakpoints={BREAKPOINTS}
          cols={{ xl: 4, lg: 4, md: 2, sm: 2 }}
          rowHeight={rowHeight}
          isBounded={true}
          margin={[24, 24]}
          useCSSTransforms={false}
          onBreakpointChange={(breakpoint: string) =>
            setRowHeight(ROWHEIGHTS[breakpoint])
          }
          measureBeforeMount={true}
        >
          {TILES.map((tile: GridTile, i: number) => (
            <motion.div
              key={tile.key}
              className={`dark:ring-steel rounded-3xl bg-white shadow-lg transition-all duration-500 ease-in-out will-change-transform dark:bg-black dark:ring-4 dark:ring-inset ${
                tile.key !== "bio"
                  ? "lg:hover:cursor-grab"
                  : "lg:hover:cursor-auto"
              }`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              {tile.key === "bio" && <Logo className="z-10" />}

              {tile.component}
            </motion.div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </main>
  );
};

export default Grid;
