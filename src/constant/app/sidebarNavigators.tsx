import type { ReactNode } from "react";
import { ROUTES } from "@/constant/app/routes";
import { ValueOf } from "@/v2-architecture/src/types";
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
import { useQuery } from "@tanstack/react-query";
import { dashboardInfoConfig } from "@/packages/react-query";

const NAV_CATEGORY = {
  OTHERS: "others",
  QUICK_ACCESS: "quick-access",
  ADMIN: "admin",
  WALLET: "wallet",
} as const;

type NavCategory = ValueOf<typeof NAV_CATEGORY>;

const NAV_CATEGORY_LABEL: Record<NavCategory, string> = {
  [NAV_CATEGORY.OTHERS]: "سایر",
  [NAV_CATEGORY.QUICK_ACCESS]: "دسترسی سریع",
  [NAV_CATEGORY.ADMIN]: "مدیریت",
  [NAV_CATEGORY.WALLET]: "کیف پول",
};

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
  category: NavCategory;
  submenus: SidebarSubMenuItem[];
}

const sidebarNavigators: SidebarNavItem[] = [
  {
    id: "dashboard",
    text: "داشبورد",
    icon: <GridIcon />,
    link: ROUTES.PANEL.ROOT,
    category: NAV_CATEGORY.QUICK_ACCESS,
    submenus: [],
  },
  {
    id: "market",
    text: "بازار ها",
    icon: <HomeChartIcon />,
    link: ROUTES.MARKET.ROOT,
    category: NAV_CATEGORY.QUICK_ACCESS,
    submenus: [],
  },
  {
    id: "assets",
    text: "دارایی‌ها",
    icon: <WalletIcon />,
    link: ROUTES.ASSETS.ROOT,
    category: NAV_CATEGORY.WALLET,
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
    category: NAV_CATEGORY.QUICK_ACCESS,
    submenus: [],
  },
  {
    id: "trade",
    text: "معامله",
    icon: <ArrowUpDownIcon />,
    link: ROUTES.TRADE.BY_SYMBOL("REBAR"),
    category: NAV_CATEGORY.QUICK_ACCESS,
    submenus: [],
  },
  {
    id: "products",
    text: "مدیریت محصول",
    icon: <BoxOutlinedIcon />,
    link: ROUTES.PRODUCTS.ROOT,
    category: NAV_CATEGORY.ADMIN,
    submenus: [],
  },
  {
    id: "permissions",
    text: "سطوح دسترسی",
    icon: <LockIcon />,
    link: ROUTES.PERMISSIONS.ROOT,
    category: NAV_CATEGORY.ADMIN,
    submenus: [],
  },
  {
    id: "demoSetting",
    text: "تنظیمات دمو",
    icon: <ToggleIcon />,
    link: ROUTES.ADMIN.DEMO_SETTING,
    category: NAV_CATEGORY.ADMIN,
    submenus: [],
  },
  {
    id: "loyalty-setting",
    text: "سطح وفاداری",
    icon: <ReceiptCheckIcon />,
    link: ROUTES.ADMIN.LOYALTY_SETTING,
    category: NAV_CATEGORY.ADMIN,
    submenus: [],
  },
  {
    id: "profile",
    text: "پروفایل",
    icon: <UserIcon />,
    link: ROUTES.PROFILE.ROOT,
    category: NAV_CATEGORY.QUICK_ACCESS,
    submenus: [],
  },
  {
    id: "robot",
    text: "ربات معامله گر",
    icon: <RobotIcon />,
    link: ROUTES.ROBOT.ROOT,
    category: NAV_CATEGORY.ADMIN,
    submenus: [],
  },
];

interface GetSidebarNavigatorsConfig {
  permissionGroups: PermissionGroup[] | undefined;
}

function getSidebarNavigators({
  permissionGroups,
}: GetSidebarNavigatorsConfig): SidebarNavItem[] {
  // * Returns StandardUser navigators when permissionGroups is pending
  if (permissionGroups === undefined || !permissionGroups.length) {
    return getStandardUserNavs();
  }

  const { isStandardUser, isAdmin } = getPermissionGroup(permissionGroups);

  if (isStandardUser && !isAdmin) {
    return getStandardUserNavs();
  }

  return sidebarNavigators;
}

function getStandardUserNavs(): SidebarNavItem[] {
  return sidebarNavigators.filter((nav) => nav.category !== NAV_CATEGORY.ADMIN);
}

function useAppNavigators() {
  const { data: dashboardInfo } = useQuery(dashboardInfoConfig());

  return {
    navigators: getSidebarNavigators({
      permissionGroups: dashboardInfo?.userPermissionGroups,
    }),
  };
}

export {
  getSidebarNavigators,
  useAppNavigators,
  NAV_CATEGORY,
  NAV_CATEGORY_LABEL,
};

export type { NavCategory, SidebarNavItem, SidebarSubMenuItem };
