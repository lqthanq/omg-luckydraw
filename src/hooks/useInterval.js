import { useCallback, useEffect, useRef } from "react";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(() => {});
  const interval = useRef(null);

  const run = useCallback(() => {
    if (delay !== null) {
      savedCallback.current();
      interval.current = setInterval(() => {
        savedCallback.current();
      }, delay || 0);
    }
  }, [delay]);
  const clear = useCallback(() => clearInterval(interval.current), []);

  useEffect(() => {
    savedCallback.current = callback;
  });

  return [run, clear];
};
