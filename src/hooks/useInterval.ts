import { useEffect, useRef } from 'react';

export function useInterval(
  callback: () => void,
  delay: number,
  reset: number | string,
) {
  const savedCallback = useRef<() => void>(() => undefined);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, reset]);
}
