"use client";

import { useSyncExternalStore, useRef, useMemo } from "react";

type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function getTimeLeft(endTime: number): TimeLeft {
  const total = endTime - Date.now();
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
    expired: total <= 0,
  };
}

export function useCountdown(endDate: Date | null) {
  const endTime = endDate?.getTime() ?? null;

  const cacheRef = useRef<TimeLeft | null>(null);

  const subscribe = useMemo(
    () => (notify: () => void) => {
      if (!endTime) return () => {};
      const id = setInterval(notify, 1000);
      return () => clearInterval(id);
    },
    [endTime],
  );

  const getSnapshot = useMemo(
    () => () => {
      if (!endTime) return null;
      const next = getTimeLeft(endTime);
      const prev = cacheRef.current;
      if (
        prev &&
        prev.seconds === next.seconds &&
        prev.expired === next.expired
      ) {
        return prev;
      }
      cacheRef.current = next;
      return cacheRef.current;
    },
    [endTime],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
