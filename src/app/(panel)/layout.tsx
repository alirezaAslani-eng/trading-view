import LayoutMainPanel from "@/Layout/LayoutMainPanel";
import { PWC } from "@/types/utils";
import KycGlobalModals from "@/components/template/Modal/KycGlobalModals";

function layout({ children }: PWC) {
  return (
    <>
      <KycGlobalModals />
      <LayoutMainPanel>{children}</LayoutMainPanel>
    </>
  );
}

export default layout;
