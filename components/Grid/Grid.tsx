import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";

import Tile from "components/Grid/Tile";
import Bio from "components/Bio";
import Spotify from "components/Spotify";
import Switch from "components/Switch";
import Map from "components/Map";
import Contact from "components/Contact";

import { GridTile } from "lib/types";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ROWHEIGHTS: { [key: string]: number } = {
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
    id: "bio",
    component: <Bio />,
    styleOverrides: "lg:hover:cursor-auto",
  },
  {
    id: "spotify",
    component: <Spotify />,
  },
  {
    id: "fill-one",
    component: (
      <div className="grid-tile">
        <h1 className="gradient-fill-one bg-clip-text text-3xl font-bold text-transparent">
          This is Fill One
        </h1>
      </div>
    ),
  },
  {
    id: "fill-two",
    component: (
      <div className="grid-tile">
        <h1 className="gradient-fill-two bg-clip-text text-3xl font-bold text-transparent">
          This is Fill Two
        </h1>
      </div>
    ),
  },
  {
    id: "switch",
    component: <Switch />,
  },
  {
    id: "fill-three",
    component: (
      <div className="grid-tile">
        <h1 className="gradient-fill-three bg-clip-text text-3xl font-bold text-transparent">
          This is Fill Three
        </h1>
      </div>
    ),
  },
  {
    id: "map",
    component: (
      <div className="grid-tile">
        <h1 className="gradient-map bg-clip-text text-3xl font-bold text-transparent">
          This is Map
        </h1>
      </div>
    ),
    // component: <Map />,
  },
  {
    id: "contact",
    component: <Contact />,
  },
];

const LAYOUTS = {
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

  return (
    <main className="flex grow items-center justify-center">
      <div className="container my-16 max-w-[400px] grow md:max-w-[480px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <ResponsiveGridLayout
          layouts={LAYOUTS}
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
              key={tile.id}
              className={`group transition-all duration-500 ease-out will-change-auto lg:hover:cursor-grab ${tile.styleOverrides}`}
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
