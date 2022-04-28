import { useCallback } from "react";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";

import Stat from "components/Activity/Stat";

import fetcher from "lib/fetcher";

import type { Stats } from "lib/types";

const Activity = () => {
  const { data: stats, error } = useSWR<Stats>("/api/github/stats", fetcher, {
    revalidateOnFocus: false,
  });

  const renderContent = useCallback(() => {
    if (error) {
      return (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center text-xs"
        >
          Failed to load GitHub stats
        </motion.div>
      );
    }

    if (!stats) {
      return (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>
            <span className="animate-flash ml-2 inline-block h-2 w-2 rounded-full bg-gray-700 dark:bg-gray-500"></span>
            <span className="animate-flash ml-2 inline-block h-2 w-2 rounded-full bg-gray-700 [animation-delay:0.2s] dark:bg-gray-500"></span>
            <span className="animate-flash ml-2 inline-block h-2 w-2 rounded-full bg-gray-700 [animation-delay:0.4s] dark:bg-gray-500"></span>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex h-full w-full flex-wrap justify-evenly text-center lg:flex-col lg:text-left"
      >
        {Object.entries(stats).map(([key, value]) => (
          <Stat key={key} display={value.display} value={value.value} />
        ))}
      </motion.div>
    );
  }, [stats, error]);

  return (
    <div className="flex h-full items-center justify-center">
      <AnimatePresence exitBeforeEnter>{renderContent()}</AnimatePresence>
    </div>
  );
};

export default Activity;
