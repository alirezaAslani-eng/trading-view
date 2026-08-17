import { useCallback, useEffect, useState } from "react";

export default function useDismiss(key: string) {
  const [isDismised, setIsDismised] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(key);
    setIsDismised(dismissed === "true" ? true : false);
  }, [key]);

  const dismiss = useCallback(() => {
    localStorage.setItem(key, "true");
    setIsDismised(true);
  }, []);

  return {
    isDismised,
    dismiss,
  };
}
