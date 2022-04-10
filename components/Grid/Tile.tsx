import { motion } from "framer-motion";

import Logo from "components/Logo";

import { useLayoutContext } from "contexts/LayoutContext";

import type { GridTile } from "lib/types";

const backdropVariants = {
  hover: {
    opacity: 0.8,
    rotate: 2,
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

      {id === "bio" && <Logo className="z-[2]" />}

      <div className="grid-tile">{component}</div>
    </motion.div>
  );
};

export default Tile;
