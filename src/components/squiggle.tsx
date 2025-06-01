"use client";

import { motion } from "motion/react";

export function Squiggle() {
  return (
    <svg height="20" viewBox="0 0 158 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--inverse)" />
          <stop offset="100%" stopColor="var(--inverse)" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <motion.path
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: 1,
          pathLength: 1,
          transition: { duration: 1, opacity: { duration: 0.2 } },
        }}
        d="M15.1566 3C-0.68555 16.9536 1.76262 24.2187 6.87562 19.6255C16.8877 10.6314 29.8656 5.96884 25.3392 11.9065C21.7609 16.6007 16.2897 21.4068 24.2108 18.438C32.1319 15.4691 43.4477 11.9065 36.6582 18.438C30.81 24.0639 41.7504 17.8442 50.803 14.5785C59.5639 11.418 63.2505 10.719 57.5926 16.6567C50.8563 23.726 71.1083 18.4142 78.5269 14.8754C90.9743 8.93768 88.1422 17.5473 107.945 19.6255C128.11 21.7417 166.79 11.0159 151.514 17.8442"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
