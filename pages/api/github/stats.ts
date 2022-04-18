import type { NextApiRequest, NextApiResponse } from "next";

import { getYearlyContributions, getStats } from "lib/github";
import { normalizeUtc } from "lib/utils";

import type { Stats } from "lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stats>
) {
  const response = await getStats();

  const years = response.data.user.contributionsCollection.contributionYears;
  const today = normalizeUtc(new Date()).toISOString().split("T")[0];
  const thisYear = new Date().getFullYear();

  let longestStreak = 0;
  let currentStreak = -1;
  let potentialStreak = 0;
  let totalContributions = 0;
  let contributionsThisYear = 0;

  for (const year of years) {
    const collection = await getYearlyContributions(year);

    const contributionCalendar =
      collection.data.user.contributionsCollection.contributionCalendar;
    const contributions = contributionCalendar.weeks;

    if (year === thisYear) {
      contributionsThisYear = contributionCalendar.totalContributions;
    }

    totalContributions += contributionCalendar.totalContributions;
    for (const contribution of [...contributions].reverse()) {
      for (const day of [...contribution.contributionDays].reverse()) {
        if (day.contributionCount === 0) {
          longestStreak = Math.max(potentialStreak, longestStreak);
          if (currentStreak === -1 && day.date < today) {
            currentStreak = Math.max(potentialStreak, currentStreak);
          }

          potentialStreak = 0;
        } else {
          potentialStreak += 1;
        }
      }
    }
  }

  return res.status(200).json({
    currentStreak: {
      display: "Current streak",
      value: currentStreak,
    },
    longestStreak: {
      display: "Longest streak",
      value: longestStreak,
    },
    contributionsThisYear: {
      display: "Contributions this year",
      value: contributionsThisYear,
    },
    totalContributions: {
      display: "Total contributions",
      value: totalContributions,
    },
    createdAt: response.data.user.createdAt,
  });
}
