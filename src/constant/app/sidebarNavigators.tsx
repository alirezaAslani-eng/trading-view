import type { ReactNode } from "react";
import { ROUTES } from "@/constant/app/routes"; // adjust path to wherever routes.ts lives
import {
  ArrowUpDownIcon,
  BoxOutlinedIcon,
  GridIcon,
  HistoryIcon,
  HomeChartIcon,
  LockIcon,
  ReceiptCheckIcon,
  RobotIcon,
  ToggleIcon,
  UserIcon,
  WalletIcon,
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
    icon: <GridIcon />,
    link: ROUTES.PANEL.ROOT,
    submenus: [],
  },
  {
    id: "market",
    text: "بازار ها",
    icon: <HomeChartIcon />,
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
    id: "delivery",
    text: "تحویل فیزیکی کالا",
    icon: <BoxOutlinedIcon />,
    link: "no-route-yet",
    submenus: [],
  },
  {
    id: "products",
    text: "مدریت محصول",
    icon: <BoxOutlinedIcon />,
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
    icon: <ToggleIcon />,
    link: ROUTES.ADMIN.DEMO_SETTING,
    submenus: [],
  },
  {
    id: "loyalty-setting",
    text: "تنظیمات سطح وفاداری",
    icon: <ReceiptCheckIcon />,
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
    icon: <RobotIcon />,
    link: ROUTES.ROBOT.ROOT,
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
