import { MouseEventHandler } from "react";

interface UseMuiMenuStateReturn<TAnchoreEl extends HTMLElement> {
  openMenu: MouseEventHandler<TAnchoreEl>;
  closeMenu: () => void;
  anchoreEl: TAnchoreEl | null;
  isOpenMenu: boolean;
  anchoreWidth: number | null;
}

export type { UseMuiMenuStateReturn };
