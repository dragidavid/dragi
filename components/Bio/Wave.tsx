import { motion } from "framer-motion";

import { classNames } from "lib/utils";

import { GRADIENTS } from "lib/gradients";

const Wave = () => (
  <motion.div
    animate={{ rotate: 20 }}
    transition={{
      repeat: 7,
      repeatType: "mirror",
      duration: 0.2,
      delay: 0.5,
      ease: "easeInOut",
    }}
    className={classNames(
      "gradient-text header -mb-5 -mr-11 inline-block pb-5 pr-11",
      GRADIENTS.bio.class
    )}
  >
    👋🏻
  </motion.div>
);

export default Wave;
