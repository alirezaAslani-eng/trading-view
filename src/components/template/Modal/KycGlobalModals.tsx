"use client";
import { useKycModal } from "@/context/features/kyc/KycModal/KycModalContext";
import KycL1Form from "@/components/template/Form/KycL1Form";
import { Dialog } from "@mui/material";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import KycL2Form from "@/components/template/Form/KycL2Form";

function KycGlobalModals() {
  const { state, closeKycModal, successKycModal } = useKycModal();

  return (
    <>
      <Dialog open={state.modalFlow === "kycLevel1"}>
        <ModalLayout>
          <ModalLayoutHeading>
            <ModalLayoutTitle
              title="احراز هویت"
              subtitle="برای تکمیل احراز هویت پایه، اطلاعات زیر را وارد کنید"
            />
            <ModalLayoutCloseIcon onClick={closeKycModal} />
          </ModalLayoutHeading>
          <ModalLayoutBody>
            <KycL1Form onSuccess={successKycModal} />
          </ModalLayoutBody>
        </ModalLayout>
      </Dialog>

      <Dialog open={state.modalFlow === "kycLevel2"}>
        <ModalLayout>
          <ModalLayoutHeading>
            <ModalLayoutTitle
              title="احراز هویت"
              subtitle="برای تکمیل احراز هویت پایه، اطلاعات زیر را وارد کنید"
            />
            <ModalLayoutCloseIcon onClick={closeKycModal} />
          </ModalLayoutHeading>
          <ModalLayoutBody>
            <KycL2Form />
          </ModalLayoutBody>
        </ModalLayout>
      </Dialog>

      <Dialog open={state.modalFlow === "successKyc"}>
        <ModalLayout>
          <ModalLayoutHeading>
            <ModalLayoutTitle
              title="احراز هویت"
              subtitle="برای تکمیل احراز هویت پایه، اطلاعات زیر را وارد کنید"
            />
            <ModalLayoutCloseIcon onClick={closeKycModal} />
          </ModalLayoutHeading>
          <ModalLayoutBody>"sdfsdf"</ModalLayoutBody>
        </ModalLayout>
      </Dialog>
    </>
  );
}

export default KycGlobalModals;
