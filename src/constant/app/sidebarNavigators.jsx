import DashboardIcon from "@/assets/svg/dashboard.svg";
import MarketIcon from "@/assets/svg/markets.svg";
import HistoryIcon from "@/assets/svg/history.svg";
import LinearIcon from "@/assets/svg/linear.svg";
import ChartIcon from "@/assets/svg/chart.svg";
import WalletIcon from "@/assets/svg/wallet.svg";
import MessageIcon from "@/assets/svg/message.svg";
import SettingIcon from "@/assets/svg/setting.svg";
const sidebarNavigators = [
  {
    text: "داشبورد",
    link: "/",
    icon: <DashboardIcon />,
    submenus: [
      { text: "نما کلی", link: "/" },
      { text: "واریز", link: "/" },
      { text: "برداشت", link: "/" },
    ],
  },
  { text: "سفارشات", link: "/", icon: <LinearIcon />, submenus: [] },
  { text: "بازار ها", link: "/", icon: <MarketIcon />, submenus: [] },
  { text: "نمودار ها", link: "/", icon: <ChartIcon />, submenus: [] },
  { text: "دارایی‌ها", link: "/", icon: <WalletIcon />, submenus: [] },
  { text: "تاریخچه", link: "/", icon: <HistoryIcon />, submenus: [] },
  { text: "پشتیبانی", link: "/", icon: <MessageIcon />, submenus: [] },
  { text: "تنظیمات", link: "/", icon: <SettingIcon />, submenus: [] },
];

export default sidebarNavigators;
