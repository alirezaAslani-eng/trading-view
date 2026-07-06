import LayoutMainPanel from "@/Layout/LayoutMainPanel";
import { PWC } from "@/types/utils";
import KycGlobalModals from "@/components/template/Modal/KycGlobalModals";
import { SidebarProvider } from "@/context/app/Sidebar";
import AccessLevelModal from "@/components/template/Modal/AccessLevelModal";

function layout({ children }: PWC) {
  return (
    <SidebarProvider>
      <KycGlobalModals />
      <AccessLevelModal />
      <LayoutMainPanel>{children}</LayoutMainPanel>
    </SidebarProvider>
  );
}

export default layout;

