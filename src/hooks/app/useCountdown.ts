import { useState, useEffect, useRef } from "react";

interface UseCountdownReturn {
  /** Time remaining, in milliseconds */
  remainingMs: number;
  /** Convenience: remaining time rounded down to whole seconds */
  remainingSeconds: number;
  /** True once remainingMs has hit 0 */
  isFinished: boolean;
}

/**
 * Starts a countdown timer for `durationMs` milliseconds.
 * Ticks every second by default (good enough for "resend code in 0:30" UI).
 */
function useCountdown(
  durationMs: number,
  { tickMs = 1000 }: { tickMs?: number } = {},
): UseCountdownReturn {
  const [remainingMs, setRemainingMs] = useState(durationMs);
  const endTimeRef = useRef(Date.now() + durationMs);

  useEffect(() => {
    endTimeRef.current = Date.now() + durationMs;
    setRemainingMs(durationMs);

    if (durationMs <= 0) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, endTimeRef.current - Date.now());
      setRemainingMs(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, tickMs);

    return () => clearInterval(interval);
  }, [durationMs, tickMs]);

  return {
    remainingMs,
    remainingSeconds: Math.floor(remainingMs / 1000),
    isFinished: remainingMs <= 0,
  };
}

export default useCountdown;
