import { useEffect, useEffectEvent, useState } from "react";

function useSessionStorage<T>(
  key: string,
  defaultValue?: T,
): [T | null, (v: T) => void] {
  const [sessionValue, setSessionValue] = useState<T | null>(null);

  const initializeSessionState = useEffectEvent(() => {
    const initialSessionValue = sessionStorage.getItem(key);
    if (initialSessionValue) return JSON.parse(initialSessionValue) as T;
    return defaultValue ?? null;
  });

  useEffect(() => {
    setSessionValue(initializeSessionState());
  }, [setSessionValue]);

  const updateSession = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    setSessionValue(value);
  };
  return [sessionValue, updateSession];
}

export default useSessionStorage;
