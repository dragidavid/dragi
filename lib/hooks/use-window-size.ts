import { debounce } from "lib/debounce";
import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    const debouncedResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedResize);

    handleResize();

    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  return {
    windowSize,
    isXs: typeof windowSize?.width === "number" && windowSize?.width < 448,
    isMobile: typeof windowSize?.width === "number" && windowSize?.width < 768,
    isDesktop:
      typeof windowSize?.width === "number" && windowSize?.width >= 768,
  };
}
