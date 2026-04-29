import { useCallback, useEffect, useRef, useState } from "react";

function useMuiMenuState() {
  const [anchoreEl, setAnchoreEl] = useState(null);

  const anchoreWidth = useRef(null);

  useEffect(() => {
    anchoreWidth.current = anchoreEl?.clientWidth;
  }, [anchoreEl]);

  const openMenu = useCallback(
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
