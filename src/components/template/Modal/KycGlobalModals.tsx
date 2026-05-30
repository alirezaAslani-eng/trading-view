"use client";
import KycL1Form from "@/components/template/Form/KycL1Form";
import { Dialog } from "@mui/material";
import KycL2Form from "@/components/template/Form/KycL2Form";
import { useDispatch, useSelector } from "@/packages/redux";
import { exitKycFlow, kycModalFlow, successKyc } from "@/redux/features/kyc";
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

  const successKycModal = () => dispatch(successKyc());

  return (
    <>
      <Dialog open={kycModalFlowState === "kycLevel1"}>
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

      <Dialog open={kycModalFlowState === "kycLevel2"}>
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

      <Dialog open={kycModalFlowState === "successKyc"}>
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
