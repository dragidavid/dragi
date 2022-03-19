import { motion } from "framer-motion";

import Logo from "components/Logo";

import { GridTile } from "lib/types";
import { gradients } from "lib/gradients";

const glowVariants = {
  hover: {
    opacity: 0.7,
  },
  initial: {
    scale: 1.02,
    opacity: 0,
  },
};

const tileVariants = {
  hover: {
    scale: 1.02,
  },
  initial: {
    scale: 1,
  },
};

const Tile = ({ id, component }: GridTile) => {
  return (
    <motion.div initial="initial" whileHover="hover">
      <motion.div
        variants={glowVariants}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.4,
        }}
        className={`glow gradient-${id}`}
      />

      {id === "bio" && <Logo className="z-10" />}

      <motion.div
        variants={tileVariants}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.4,
        }}
        className="grid-tile"
      >
        {component}
      </motion.div>
    </motion.div>
  );
};

export default Tile;
