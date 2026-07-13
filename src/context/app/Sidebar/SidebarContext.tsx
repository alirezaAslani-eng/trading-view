"use client";

import { ROUTES } from "@/constant/app/routes";
import useUpdateEffect from "@/hooks/app/useUpdateEffect";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

type SidebarContextValue = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isInTradePage = pathname.startsWith(ROUTES.TRADE.ROOT);
  const [isCollapsed, setIsCollapsed] = useState(isInTradePage);

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

  useUpdateEffect(() => {
    if (!isInTradePage) return;
    setIsCollapsed(true);
  }, [isInTradePage]);

  return <SidebarContext value={value}>{children}</SidebarContext>;
}

function useSidebarContext() {
  return useContext(SidebarContext);
}

export { SidebarProvider, useSidebarContext };
