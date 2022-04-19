import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";

import Stat from "components/Activity/Stat";

import fetcher from "lib/fetcher";

import { useLayoutContext } from "contexts/LayoutContext";

import type { Stats } from "lib/types";

const Activity = () => {
  const { data: stats } = useSWR<Stats>("/api/github/stats", fetcher, {
    revalidateOnFocus: false,
  });

  const { getInlineGradient } = useLayoutContext();

  return (
    <div className="flex h-full items-center justify-center">
      <AnimatePresence exitBeforeEnter>
        {!stats ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              style={{ backgroundImage: getInlineGradient("activity") }}
              className="h-[4px] w-8 rounded-[50%]"
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full w-full flex-col justify-between"
          >
            <div className="flex h-full flex-wrap text-center lg:flex-col lg:gap-7">
              <Stat
                display={stats.currentStreak.display}
                value={stats.currentStreak.value}
              />
              <Stat
                display={stats.longestStreak.display}
                value={stats.longestStreak.value}
              />
              <Stat
                display={stats.contributionsThisYear.display}
                value={stats.contributionsThisYear.value}
              />
              <Stat
                display={stats.totalContributions.display}
                value={stats.totalContributions.value}
              />
            </div>
            <p className="text-xs italic">
              GitHub activity from{" "}
              {new Date(stats.createdAt).toLocaleDateString()}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Activity;
