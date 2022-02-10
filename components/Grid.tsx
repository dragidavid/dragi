import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { motion } from "framer-motion";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ROWHEIGHTS: any = {
  xl: 295,
  lg: 234,
  md: 216,
  sm: 179,
};

const TILES: string[] = [
  "bio",
  "spotify",
  "fill-one",
  "fill-two",
  "fill-three",
  "toggle",
  "contact",
];

export default function Grid() {
  const [rowHeight, setRowHeight] = useState(ROWHEIGHTS.xl);

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
    <div
      className={`container mx-auto h-screen max-w-[400px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[1024px] xl:max-w-[1280px]`}
    >
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
        {TILES.map((tile: string, index: number) => (
          <motion.div
            className="rounded-3xl bg-gray-50"
            key={tile}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", delay: 0.1 * index }}
          >
            {tile}
          </motion.div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
