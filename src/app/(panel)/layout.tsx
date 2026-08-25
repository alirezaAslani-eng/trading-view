import LayoutMainPanel from "@/Layout/LayoutMainPanel";
import { PWC } from "@/types/utils";
import KycGlobalModals from "@/components/template/Modal/KycGlobalModals";
import { SidebarProvider } from "@/context/app/Sidebar";
import { BankModalProvider } from "@/context/feature/bank/BankModal";
import BankGlobalModals from "@/components/template/Modal/BankGlobalModals";
import WalletPortfolioSyncProvider from "@/context/feature/Portfolio/WalletPortfolioSyncProvider";
import OrdersSyncProvider from "@/context/feature/market/OrdersSyncProvider";
import { JoinMarketsProvider } from "@/context/feature/market/JoinMarketsProvider";
import MarketTickersSyncProvider from "@/context/feature/market/MarketTickersSyncProvider";
import RecentTradeSyncProvider from "@/context/feature/trade/RecentTradeSyncProvider";
import { TradeModeProvider } from "@/context/feature/trade/TradeMode";
import { SettlementModeProvider } from "@/v2-architecture/src/features/trading";
import { NotificationSocketProvider } from "@/v2-architecture/src/features/notification";
import TickerInfoSyncProvider from "@/context/feature/market/TickerInfoSyncProvider";
function layout({ children }: PWC) {
  return (
    <TradeModeProvider>
      <SettlementModeProvider>
        {/* // * invok Markets  */}
        <JoinMarketsProvider />
        {/* // * invok Markets  */}

        {/* // * Market Listeners */}
        <MarketTickersSyncProvider />
        <RecentTradeSyncProvider />
        <TickerInfoSyncProvider />
        {/* // * Market Listeners */}

        {/* // * ---- Wallet & Orders & Notifications Listeners ---- */}
        <WalletPortfolioSyncProvider />
        <OrdersSyncProvider />
        <NotificationSocketProvider />
        {/* // * ---- Wallet & Orders & Notifications Listeners ---- */}

        <BankModalProvider>
          <KycGlobalModals />
          <BankGlobalModals />

          <SidebarProvider>
            <LayoutMainPanel>{children}</LayoutMainPanel>
          </SidebarProvider>
        </BankModalProvider>
      </SettlementModeProvider>
    </TradeModeProvider>
  );
}

export default layout;
