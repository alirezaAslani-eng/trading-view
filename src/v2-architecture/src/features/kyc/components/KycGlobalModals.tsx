"use client";

import { useDispatch, useSelector } from "@/v2-architecture/src/store";
import { exitKycFlow, kycModalFlow } from "../redux";
import { Dialog } from "@mui/material";
import { NeedKycModal } from "./NeedKycModal";
import ConditionaKycForm from "./ConditionaKycForm";
import KycL1ModalForm from "./KycL1ModalForm";
import KycL2ModalForm from "./KycL2ModalForm";
import KycSuccessModal from "./KycSuccessModal";

function KycGlobalModals() {
  const kycModalFlowState = useSelector(kycModalFlow);
  const dispatch = useDispatch();

  const closeKycModal = () => dispatch(exitKycFlow());

  return (
    <>
      <Dialog open={kycModalFlowState === "needKyc"} onClose={closeKycModal}>
        <NeedKycModal />
      </Dialog>
      <Dialog open={kycModalFlowState === "upgradeKyc"} onClose={closeKycModal}>
        <ConditionaKycForm
          kycL1Form={<KycL1ModalForm />}
          kycL2Form={<KycL2ModalForm />}
        />
      </Dialog>

      <Dialog open={kycModalFlowState === "successKyc"} onClose={closeKycModal}>
        <KycSuccessModal />
      </Dialog>
    </>
  );
}

export default KycGlobalModals;
