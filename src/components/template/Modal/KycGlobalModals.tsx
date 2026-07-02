"use client";
import KycL1Form from "@/components/template/Form/KycL1Form";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "@/packages/redux";
import { exitKycFlow, kycModalFlow } from "@/redux/features/kyc";
import ConditionaKycForm from "../kyc/ConditionaKycForm";
import KycSuccessModal from "../kyc/KycSuccessModal";
import { kycContent } from "@/content/kyc";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";

function KycGlobalModals() {
  const kycModalFlowState = useSelector(kycModalFlow);
  const dispatch = useDispatch();

  const closeKycModal = () => dispatch(exitKycFlow());

  return (
    <>
      <Dialog open={kycModalFlowState === "upgradeKyc"} onClose={closeKycModal}>
        <ConditionaKycForm
          kycL1Form={
            <ModalLayout>
              <ModalLayoutHeading>
                <ModalLayoutTitle
                  title={kycContent.kycL1ModalFormTitle}
                  subtitle={kycContent.kycL1ModalFormSubTitle}
                />
                <ModalLayoutCloseIcon onClick={closeKycModal} />
              </ModalLayoutHeading>
              <ModalLayoutBody>
                <KycL1Form />
              </ModalLayoutBody>
            </ModalLayout>
          }
          kycL2Form={
            <ModalLayout>
              <ModalLayoutHeading>
                <ModalLayoutTitle
                  title={kycContent.kycL2ModalFormTitle}
                  subtitle={kycContent.kycL2ModalFormSubTitle}
                />
                <ModalLayoutCloseIcon onClick={closeKycModal} />
              </ModalLayoutHeading>
              <ModalLayoutBody>
                <KycL1Form />
              </ModalLayoutBody>
            </ModalLayout>
          }
        />
      </Dialog>

      <Dialog open={kycModalFlowState === "successKyc"} onClose={closeKycModal}>
        <KycSuccessModal />
      </Dialog>
    </>
  );
}

export default KycGlobalModals;
