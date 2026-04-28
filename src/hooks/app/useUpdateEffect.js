import { useEffect, useRef } from "react";

function useUpdateEffect(effect, depsArray) {
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const cleanUp = effect();
    if (cleanUp) return cleanUp;
  }, depsArray);
}

export default useUpdateEffect;
