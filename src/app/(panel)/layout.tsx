import LayoutMainPanel from "@/Layout/LayoutMainPanel";
import { PWC } from "@/types/utils";
import KycGlobalModals from "@/components/template/Modal/KycGlobalModals";
import { SidebarProvider } from "@/context/app/Sidebar";
import { BankModalProvider } from "@/context/feature/bank/BankModal";
import BankGlobalModals from "@/components/template/Modal/BankGlobalModals";
import TickerInfoSyncProvider from "@/context/feature/market/TickerInfoSyncProvider";
import MarketTickersSyncProvider from "@/context/feature/market/MarketTickersSyncProvider";
import RecentTradeSyncProvider from "@/context/feature/trade/RecentTradeSyncProvider";
import WalletPortfolioSyncProvider from "@/context/feature/Portfolio/WalletPortfolioSyncProvider";
import OrdersSyncProvider from "@/context/feature/market/OrdersSyncProvider";
import { MarketProvider } from "@/v2-architecture/src/features/trading";
function layout({ children }: PWC) {
  return (
    <>
      {/* // * ---- Signalr Providers ---- */}
      <TickerInfoSyncProvider />
      <MarketTickersSyncProvider />
      <WalletPortfolioSyncProvider />
      <RecentTradeSyncProvider />
      <OrdersSyncProvider />
      {/* // * ---- Signalr Providers ---- */}
      <BankModalProvider>
        <SidebarProvider>
          <KycGlobalModals />
          <BankGlobalModals />
          <MarketProvider>
            <LayoutMainPanel>{children}</LayoutMainPanel>
          </MarketProvider>
        </SidebarProvider>
      </BankModalProvider>
    </>
  );
}

export default layout;
