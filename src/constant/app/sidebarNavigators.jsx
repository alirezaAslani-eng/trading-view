import DashboardIcon from "@/assets/svg/dashboard.svg";
import MarketIcon from "@/assets/svg/markets.svg";
import HistoryIcon from "@/assets/svg/history.svg";
import LinearIcon from "@/assets/svg/linear.svg";
import ChartIcon from "@/assets/svg/chart.svg";
import WalletIcon from "@/assets/svg/wallet.svg";
import MessageIcon from "@/assets/svg/message.svg";
import SettingIcon from "@/assets/svg/setting.svg";
import { BoxOutlinedIcon, LockIcon, UserIcon } from "@/components/ui/Icon";
const sidebarNavigators = [
  {
    text: "داشبورد",
    link: "/",
    icon: <DashboardIcon />,
    id: crypto.randomUUID(),
    submenus: [
      { text: "نما کلی", link: "/", id: crypto.randomUUID() },
      { text: "واریز", link: "/", id: crypto.randomUUID() },
      { text: "برداشت", link: "/", id: crypto.randomUUID() },
    ],
  },
  {
    text: "سفارشات",
    link: "/",
    icon: <LinearIcon />,
    id: crypto.randomUUID(),
    submenus: [
      { text: "نما کلی", link: "/", id: crypto.randomUUID() },
      { text: "واریز", link: "/", id: crypto.randomUUID() },
      { text: "برداشت", link: "/", id: crypto.randomUUID() },
    ],
  },
  {
    text: "بازار ها",
    link: "/",
    icon: <MarketIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "نمودار ها",
    link: "/",
    icon: <ChartIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "دارایی‌ها",
    link: "/panel/assets",
    icon: <WalletIcon />,
    id: crypto.randomUUID(),
    submenus: [
      {
        text: "برداشت",
        link: "/panel/assets/withdraw",
        id: crypto.randomUUID(),
      },
      {
        text: "واریز",
        link: "/panel/assets/deposit",
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    text: "تاریخچه",
    link: "/",
    icon: <HistoryIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "پشتیبانی",
    link: "/",
    icon: <MessageIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "مدریت محصول",
    link: "/admin/products",
    icon: <BoxOutlinedIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "سطوح دسترسی",
    link: "/admin/permissions/admin",
    icon: <LockIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "پروفایل",
    link: "/panel/profile/my-info",
    icon: <UserIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
  {
    text: "تنظیمات",
    link: "/",
    icon: <SettingIcon />,
    id: crypto.randomUUID(),
    submenus: [],
  },
];

export default sidebarNavigators;
