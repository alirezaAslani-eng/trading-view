"use client";
import KycL1ModalForm from "@/components/template/Form/KycL1ModalForm";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "@/packages/redux";
import { exitKycFlow, kycModalFlow } from "@/redux/features/kyc";
import ConditionaKycForm from "../kyc/ConditionaKycForm";
import KycSuccessModal from "../kyc/KycSuccessModal";
import KycL2ModalForm from "../Form/KycL2ModalForm";
import NeedKycModal from "./NeedKycModal";

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
