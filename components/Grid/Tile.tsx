import { motion } from "framer-motion";

import { useLayoutContext } from "contexts/LayoutContext";

import type { GridTile } from "lib/types";

const backdropVariants = {
  hover: {
    opacity: 0.8,
    rotate: 1,
  },
  initial: {
    opacity: 0,
  },
};

const Tile = ({ id, component }: GridTile) => {
  const { getInlineGradient } = useLayoutContext();

  return (
    <motion.div initial="initial" whileHover="hover">
      <motion.div
        variants={backdropVariants}
        transition={{
          ease: "easeInOut",
          duration: 0.4,
        }}
        style={{ backgroundImage: getInlineGradient(id) }}
        className="backdrop"
      />

      <div className="grid-tile">{component}</div>
    </motion.div>
  );
};

export default Tile;
