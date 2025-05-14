import { useState, useEffect, useCallback } from "react";

import { debounce } from "lib/debounce";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : undefined,
    height: typeof window !== "undefined" ? window.innerHeight : undefined,
  }));

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const debouncedResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedResize);

    return () => window.removeEventListener("resize", debouncedResize);
  }, [handleResize]);

  const isXs = windowSize.width !== undefined && windowSize.width < 448;
  const isMobile = windowSize.width !== undefined && windowSize.width < 768;
  const isDesktop = windowSize.width !== undefined && windowSize.width >= 768;

  return {
    windowSize,
    isXs,
    isMobile,
    isDesktop,
  };
}
