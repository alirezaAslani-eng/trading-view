import type { ReactNode } from "react";
import { ROUTES } from "@/constant/app/routes"; // adjust path to wherever routes.ts lives
import DashboardIcon from "@/assets/svg/dashboard.svg";
import MarketIcon from "@/assets/svg/markets.svg";
import HistoryIcon from "@/assets/svg/history.svg";
import WalletIcon from "@/assets/svg/wallet.svg";
import {
  ArrowUpDownIcon,
  BoxOutlinedIcon,
  LockIcon,
  UserIcon,
} from "@/components/ui/Icon";
import {
  getPermissionGroup,
  PermissionGroup,
} from "../features/permission/permissionGroups";

interface SidebarSubMenuItem {
  id: string;
  text: string;
  link: string;
}

interface SidebarNavItem {
  id: string;
  text: string;
  link: string;
  icon: ReactNode;
  submenus: SidebarSubMenuItem[];
}

const createSubMenu = (text: string, link: string): SidebarSubMenuItem => ({
  id: crypto.randomUUID(),
  text,
  link,
});

const createNavItem = (
  text: string,
  link: string,
  icon: ReactNode,
  submenus: SidebarSubMenuItem[] = [],
): SidebarNavItem => ({
  id: crypto.randomUUID(),
  text,
  link,
  icon,
  submenus,
});

const sidebarNavigators: SidebarNavItem[] = [
  createNavItem("داشبورد", ROUTES.PANEL.ROOT, <DashboardIcon />),
  createNavItem("بازار ها", ROUTES.MARKET.ROOT, <MarketIcon />),
  createNavItem("دارایی‌ها", ROUTES.ASSETS.ROOT, <WalletIcon />, [
    createSubMenu("برداشت", ROUTES.ASSETS.WITHDRAW),
    createSubMenu("واریز", ROUTES.ASSETS.DEPOSIT),
  ]),
  createNavItem("تاریخچه", ROUTES.HISTORY.ROOT, <HistoryIcon />),
  createNavItem("معامله", ROUTES.TRADE.BY_SYMBOL("REBAR"), <ArrowUpDownIcon />),
  createNavItem("مدریت محصول", ROUTES.PRODUCTS.ROOT, <BoxOutlinedIcon />),
  createNavItem("سطوح دسترسی", ROUTES.PERMISSIONS.ROOT, <LockIcon />),
  createNavItem("پروفایل", ROUTES.PROFILE.OVERIVIEW, <UserIcon />),
];

interface getSidebarNavigatorsConfig {
  permissionGroups: PermissionGroup[] | undefined;
}
function getSidebarNavigators({
  permissionGroups,
}: getSidebarNavigatorsConfig): SidebarNavItem[] {
  // * Returns StandardUser navigators when permissionGroups is pending
  if (permissionGroups === undefined || !!!permissionGroups?.length)
    return StandardUserNavs();

  const { isStandardUser, isAdmin } = getPermissionGroup(permissionGroups);

  if (isStandardUser && !isAdmin) return StandardUserNavs();

  return sidebarNavigators;
}

export { getSidebarNavigators };
export type { SidebarNavItem, SidebarSubMenuItem };

function StandardUserNavs(): SidebarNavItem[] {
  return sidebarNavigators.filter(
    (nav) => !nav.link.startsWith(ROUTES.ADMIN.ROOT),
  );
}
