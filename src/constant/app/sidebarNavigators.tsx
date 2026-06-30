import { ROUTES } from "@/constant/app/routes"; // adjust path to wherever routes.ts lives
import DashboardIcon from "@/assets/svg/dashboard.svg";
import MarketIcon from "@/assets/svg/markets.svg";
import HistoryIcon from "@/assets/svg/history.svg";
import LinearIcon from "@/assets/svg/linear.svg";
import ChartIcon from "@/assets/svg/chart.svg";
import MessageIcon from "@/assets/svg/message.svg";
import SettingIcon from "@/assets/svg/setting.svg";
import WalletIcon from "@/assets/svg/wallet.svg";
import {
  ArrowUpDownIcon,
  BoxOutlinedIcon,
  LockIcon,
  UserIcon,
} from "@/components/ui/Icon";

const sidebarNavigators = [
  {
    text: "داشبورد",
    link: ROUTES.PANEL.ROOT,
    icon: <DashboardIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "بازار ها",
    link: ROUTES.MARKET.ROOT,
    icon: <MarketIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "دارایی‌ها",
    link: ROUTES.ASSETS.ROOT,
    icon: <WalletIcon />,
    id: crypto.randomUUID(),
    submenus: [
      {
        text: "برداشت",
        link: ROUTES.ASSETS.WITHDRAW,
        id: crypto.randomUUID(),
      },
      {
        text: "واریز",
        link: ROUTES.ASSETS.DEPOSIT,
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    text: "تاریخچه",
    link: ROUTES.HISTORY.ROOT,
    icon: <HistoryIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "معامله",
    link: ROUTES.TRADE.BY_SYMBOL("REBAR"),
    icon: <ArrowUpDownIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "مدریت محصول",
    link: ROUTES.PRODUCTS.ROOT,
    icon: <BoxOutlinedIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "سطوح دسترسی",
    link: ROUTES.PERMISSIONS.ROOT,
    icon: <LockIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "پروفایل",
    link: ROUTES.PROFILE.OVERIVIEW,
    icon: <UserIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  // ...commented blocks unchanged
];

export default sidebarNavigators;
