import { motion } from "framer-motion";

import { randomNumber, randomArray } from "lib/utils";

import { Color } from "lib/types";

type BlobProps = {
  color: Color;
};

/**
 * This will probably be replaced with a shader later on
 */

const Blob = ({ color }: BlobProps) => {
  return (
    <motion.div
      key={color.name}
      className="absolute mix-blend-normal blur-2xl filter"
      style={{
        backgroundColor: color.hex,
        left: `${randomNumber(-20, 50)}%`,
        top: `${randomNumber(-20, 50)}%`,
        height: `${randomNumber(80, 90)}%`,
        width: `${randomNumber(50, 90)}%`,
        borderRadius: `${randomArray(4, 30, 90).join("% ")}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: randomNumber(0.4, 1, true),
        x: [0, ...randomArray(4, -100, 100), 0],
        y: [0, ...randomArray(4, -100, 100), 0],
        scale: [1, ...randomArray(3, 0.82, 2, true), 1],
        rotate: 360,
      }}
      transition={{
        opacity: { duration: 2 },
        default: {
          ease: "easeInOut",
          duration: randomNumber(10, 14),
          repeat: Infinity,
        },
      }}
    />
  );
};

export default Blob;
