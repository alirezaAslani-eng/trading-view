import LayoutMainPanel from "@/Layout/LayoutMainPanel";
import { PWC } from "@/types/utils";
import KycGlobalModals from "@/components/template/Modal/KycGlobalModals";
import { SidebarProvider } from "@/context/app/Sidebar";
import { BankModalProvider } from "@/context/feature/bank/BankModal";
import BankGlobalModals from "@/components/template/Modal/BankGlobalModals";

function layout({ children }: PWC) {
  return (
    <BankModalProvider>
      <SidebarProvider>
        <KycGlobalModals />
        <BankGlobalModals />
        <LayoutMainPanel>{children}</LayoutMainPanel>
      </SidebarProvider>
    </BankModalProvider>
  );
}

export default layout;
