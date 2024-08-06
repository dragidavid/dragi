import { useEffect } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(callback, delay);

      return () => clearInterval(id);
    }
  }, [callback, delay]);
}
