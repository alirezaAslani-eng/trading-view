import LayoutMainPanel from "@/Layout/LayoutMainPanel";
import { PWC } from "@/types/utils";
import KycGlobalModals from "@/components/template/Modal/KycGlobalModals";
import { SidebarProvider } from "@/context/app/Sidebar";
import { BankModalProvider } from "@/context/feature/bank/BankModal";
import BankGlobalModals from "@/components/template/Modal/BankGlobalModals";
import TickerInfoSyncProvider from "@/context/feature/market/TickerInfoSyncProvider";
import OrderBookSyncProvider from "@/context/feature/market/OrderBookSyncProvider";
import MarketTickersSyncProvider from "@/context/feature/market/MarketTickersSyncProvider";
import RecentTradeSyncProvider from "@/context/feature/trade/RecentTradeSyncProvider";
import MarketSubscribeProvider from "@/context/feature/market/MarketSubscribeProvider";
import WalletPortfolioSyncProvider from "@/context/feature/Portfolio/WalletPortfolioSyncProvider";
function layout({ children }: PWC) {
  return (
    <>
      {/* // * ---- Signalr Providers ---- */}
      <TickerInfoSyncProvider />
      <MarketTickersSyncProvider />
      <MarketSubscribeProvider />
      <WalletPortfolioSyncProvider />
      <RecentTradeSyncProvider />
      <OrderBookSyncProvider />
      {/* // * ---- Signalr Providers ---- */}
      <BankModalProvider>
        <SidebarProvider>
          <KycGlobalModals />
          <BankGlobalModals />
          <LayoutMainPanel>{children}</LayoutMainPanel>
        </SidebarProvider>
      </BankModalProvider>
    </>
  );
}

export default layout;
