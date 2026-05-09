import React, { useCallback, useEffect, useRef, useState } from "react";
import { UseMuiMenuStateReturn } from "./types";

function useMuiMenuState<
  TAnchoreEl extends HTMLElement = HTMLDivElement,
>(): UseMuiMenuStateReturn<TAnchoreEl> {
  const [anchoreEl, setAnchoreEl] = useState<TAnchoreEl | null>(null);

  const anchoreWidth = useRef<number | null>(null);

  useEffect(() => {
    anchoreWidth.current = anchoreEl?.clientWidth ?? null;
  }, [anchoreEl]);

  const openMenu = useCallback(
    (e: React.PointerEvent<TAnchoreEl>) => {
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
