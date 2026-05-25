import LayoutMainPanel from "@/Layout/LayoutMainPanel";
import { PWC } from "@/types/utils";
import { KycModalProvider } from "@/context/features/kyc/KycModal/KycModalContext";
import KycGlobalModals from "@/components/template/Modal/KycGlobalModals";

function layout({ children }: PWC) {
  return (
    <KycModalProvider>
      <KycGlobalModals />
      <LayoutMainPanel>{children}</LayoutMainPanel>
    </KycModalProvider>
  );
}

export default layout;
