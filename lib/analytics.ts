import type { GAEventDetails } from "lib/types";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const event = ({ action, category, label, value }: GAEventDetails) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
