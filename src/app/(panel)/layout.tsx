import LayoutMainPanel from "@/Layout/LayoutMainPanel";
import { PWC } from "@/types/utils";
import KycGlobalModals from "@/components/template/Modal/KycGlobalModals";
import { SidebarProvider } from "@/context/app/Sidebar";

function layout({ children }: PWC) {
  return (
    <SidebarProvider>
      <KycGlobalModals />
      <LayoutMainPanel>{children}</LayoutMainPanel>
    </SidebarProvider>
  );
}

export default layout;
