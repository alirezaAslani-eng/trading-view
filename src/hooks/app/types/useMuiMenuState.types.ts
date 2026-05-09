interface UseMuiMenuStateReturn<TAnchoreEl extends HTMLElement> {
  openMenu: (e: React.PointerEvent<TAnchoreEl>) => void;
  closeMenu: () => void;
  anchoreEl: TAnchoreEl | null;
  isOpenMenu: boolean;
  anchoreWidth: number | null;
}

export type { UseMuiMenuStateReturn };
