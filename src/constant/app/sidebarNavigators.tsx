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

const sidebarNavigators: SidebarNavItem[] = [
  {
    id: "dashboard",
    text: "داشبورد",
    icon: <DashboardIcon />,
    link: ROUTES.PANEL.ROOT,
    submenus: [],
  },
  {
    id: "market",
    text: "بازار ها",
    icon: <MarketIcon />,
    link: ROUTES.MARKET.ROOT,
    submenus: [],
  },
  {
    id: "assets",
    text: "دارایی‌ها",
    icon: <WalletIcon />,
    link: ROUTES.ASSETS.ROOT,
    submenus: [
      {
        id: "mragin",
        text: "اعتبار معاملاتی",
        link: ROUTES.ASSETS.MARGIN,
      },
      {
        id: "assets-withdraw",
        text: "برداشت",
        link: ROUTES.ASSETS.WITHDRAW,
      },
      {
        id: "assets-deposit",
        text: "واریز",
        link: ROUTES.ASSETS.DEPOSIT,
      },
    ],
  },
  {
    id: "history",
    text: "تاریخچه",
    icon: <HistoryIcon />,
    link: ROUTES.HISTORY.ROOT,
    submenus: [],
  },
  {
    id: "trade",
    text: "معامله",
    icon: <ArrowUpDownIcon />,
    link: ROUTES.TRADE.BY_SYMBOL("REBAR"),
    submenus: [],
  },
  {
    id: "products",
    text: "مدریت محصول",
    icon: <LockIcon />,
    link: ROUTES.PRODUCTS.ROOT,
    submenus: [],
  },
  {
    id: "permissions",
    text: "سطوح دسترسی",
    icon: <LockIcon />,
    link: ROUTES.PERMISSIONS.ROOT,
    submenus: [],
  },
  {
    id: "demoSetting",
    text: "تنظیمات دمو",
    icon: <LockIcon />,
    link: ROUTES.ADMIN.DEMO_SETTING,
    submenus: [],
  },
  {
    id: "loyalty-setting",
    text: "تنظیمات سطح وفاداری",
    icon: <LockIcon />,
    link: ROUTES.ADMIN.LOYALTY_SETTING,
    submenus: [],
  },
  {
    id: "profile",
    text: "پروفایل",
    icon: <UserIcon />,
    link: ROUTES.PROFILE.ROOT,
    submenus: [],
  },
  {
    id: "robot",
    text: "ربات معامله گر",
    icon: <LockIcon />,
    link: ROUTES.ROBOT.ROBOT_CONFIG("REBAR"),
    submenus: [],
  },
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
