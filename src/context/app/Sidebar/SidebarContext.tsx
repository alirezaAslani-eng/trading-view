"use client";

import { createContext, useContext, useMemo, useState } from "react";

export const SIDEBAR_WIDTH_EXPANDED = 264;
export const SIDEBAR_WIDTH_COLLAPSED = 72;

type SidebarContextValue = {
  isCollapsed: boolean;
  sidebarWidth: number;
  toggleSidebar: () => void;
  setCollapsed: (collapsed: boolean) => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const value = useMemo(
    () => ({
      isCollapsed,
      sidebarWidth: isCollapsed
        ? SIDEBAR_WIDTH_COLLAPSED
        : SIDEBAR_WIDTH_EXPANDED,
      toggleSidebar: () => setIsCollapsed((prev) => !prev),
      setCollapsed: setIsCollapsed,
    }),
    [isCollapsed],
  );

  return <SidebarContext value={value}>{children}</SidebarContext>;
}

function useSidebarContext() {
  const ctx = useContext(SidebarContext);

  if (!ctx) {
    throw new Error("useSidebarContext must be used inside SidebarProvider");
  }

  return ctx;
}

export { SidebarProvider, useSidebarContext };
