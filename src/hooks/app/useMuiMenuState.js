import { useEffect, useRef, useState } from "react";

function useMuiMenuState() {
  const [anchoreEl, setAnchoreEl] = useState(null);

  const anchoreWidth = useRef(null);

  useEffect(() => {
    anchoreWidth.current = anchoreEl?.clientWidth;
  }, [anchoreEl]);

  const openMenu = (e) => {
    setAnchoreEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchoreEl(null);
  };

  return {
    openMenu,
    closeMenu,
    anchoreEl,
    isOpenMenu: Boolean(anchoreEl),
    anchoreWidth: anchoreEl?.clientWidth ?? anchoreWidth.current,
  };
}

export default useMuiMenuState;
