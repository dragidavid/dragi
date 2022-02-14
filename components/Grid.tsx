import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";

import Bio from "components/Bio";
import Spotify from "components/Spotify";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ROWHEIGHTS: any = {
  xl: 295,
  lg: 234,
  md: 216,
  sm: 179,
};

const TILES: any[] = [
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
      <div className="h-full w-full rounded-3xl bg-white dark:bg-gray-900">
        <p>some component</p>
      </div>
    ),
  },
  {
    key: "fill-two",
    component: (
      <div className="h-full w-full rounded-3xl bg-white dark:bg-gray-900">
        <p>some component</p>
      </div>
    ),
  },
  {
    key: "fill-three",
    component: (
      <div className="h-full w-full rounded-3xl bg-white dark:bg-gray-900">
        <p>some component</p>
      </div>
    ),
  },
  {
    key: "toggle",
    component: (
      <div className="h-full w-full rounded-3xl bg-white dark:bg-gray-900">
        <p>some component</p>
      </div>
    ),
  },
  {
    key: "contact",
    component: (
      <div className="h-full w-full rounded-3xl bg-white dark:bg-gray-900">
        <p>some component</p>
      </div>
    ),
  },
];

export default function Grid() {
  const [rowHeight, setRowHeight] = useState(ROWHEIGHTS.xl);
  // TODO set the row height according to the window's width instead of just setting xl

  const layouts = {
    xl: [
      { i: "bio", x: 0, y: 0, w: 2, h: 1, isResizable: false },
      { i: "spotify", x: 2, y: 0, w: 1, h: 1, isResizable: false },
      { i: "fill-one", x: 3, y: 0, w: 1, h: 2, isResizable: false },
      { i: "fill-two", x: 0, y: 1, w: 1, h: 2, isResizable: false },
      { i: "toggle", x: 1, y: 1, w: 1, h: 1, isResizable: false },
      { i: "fill-three", x: 2, y: 1, w: 1, h: 1, isResizable: false },
      { i: "contact", x: 1, y: 1, w: 3, h: 1, isResizable: false },
    ],
    md: [
      { i: "bio", x: 0, y: 0, w: 2, h: 1, isResizable: false },
      { i: "fill-one", x: 0, y: 1, w: 1, h: 2, isResizable: false },
      { i: "fill-two", x: 1, y: 1, w: 1, h: 2, isResizable: false },
      { i: "toggle", x: 0, y: 3, w: 1, h: 1, isResizable: false },
      { i: "fill-three", x: 1, y: 3, w: 1, h: 1, isResizable: false },
      { i: "spotify", x: 0, y: 4, w: 2, h: 1, isResizable: false },
      { i: "contact", x: 1, y: 4, w: 2, h: 1, isResizable: false },
    ],
  };

  return (
    <main className="container mx-auto max-w-[400px] grow sm:max-w-[400px] md:max-w-[480px] lg:max-w-[1024px] xl:max-w-[1280px]">
      <ResponsiveGridLayout
        layouts={layouts}
        breakpoints={{
          xl: 1279,
          lg: 1023,
          md: 479,
          sm: 399,
        }}
        cols={{ xl: 4, lg: 4, md: 2, sm: 2 }}
        rowHeight={rowHeight}
        isBounded={true}
        margin={{ xl: [20, 20], lg: [18, 18], md: [16, 16], sm: [14, 14] }}
        onBreakpointChange={(breakpoint: string) =>
          setRowHeight(ROWHEIGHTS[breakpoint])
        }
        measureBeforeMount={true}
      >
        {TILES.map((tile: any, index: number) => (
          <motion.div
            className="overflow-hidden rounded-3xl shadow-xl dark:border-2 dark:border-gray-800 dark:shadow-lg"
            key={tile.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease: "easeInOut",
              delay: ((Math.floor(Math.random() * 2) + 0.1) / 10) * index,
            }}
          >
            {tile.component}
          </motion.div>
        ))}
      </ResponsiveGridLayout>
    </main>
  );
}

// Math.floor(Math.random() * 0.3) + 0.1) / 10
