"use client";

import { createContext, useContext, useState } from "react";

type SidebarContextValue = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const value = {
    isCollapsed,
    toggleSidebar: () => {
      setIsCollapsed((prev) => !prev);
    },
    closeSidebar: () => {
      setIsCollapsed(true);
    },
    openSidebar: () => {
      setIsCollapsed(false);
    },
  };

  return <SidebarContext value={value}>{children}</SidebarContext>;
}

function useSidebarContext() {
  return useContext(SidebarContext);
}

export { SidebarProvider, useSidebarContext };
