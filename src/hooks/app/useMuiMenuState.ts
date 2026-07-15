import { useCallback, useEffect, useRef, useState } from "react";
import { UseMuiMenuStateReturn } from "./types";

function useMuiMenuState<
  TAnchoreEl extends HTMLElement = HTMLElement,
>(): UseMuiMenuStateReturn<TAnchoreEl> {
  const [anchoreEl, setAnchoreEl] = useState<TAnchoreEl | null>(null);

  const anchoreWidth = useRef<number | null>(null);

  useEffect(() => {
    anchoreWidth.current = anchoreEl?.clientWidth ?? null;
  }, [anchoreEl]);

  const openMenu: UseMuiMenuStateReturn<TAnchoreEl>["openMenu"] = useCallback(
    (e) => {
      setAnchoreEl(e.currentTarget);
    },
    [setAnchoreEl],
  );

  const closeMenu = useCallback(() => {
    setAnchoreEl(null);
  }, [setAnchoreEl]);

  return {
    openMenu,
    closeMenu,
    anchoreEl,
    isOpenMenu: Boolean(anchoreEl),
    anchoreWidth: anchoreEl?.clientWidth ?? anchoreWidth.current,
  };
}

export default useMuiMenuState;
