"use client";
import KycL1Form from "@/components/template/Form/KycL1Form";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "@/packages/redux";
import { exitKycFlow, kycModalFlow, successKyc } from "@/redux/features/kyc";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import ConditionaKycForm from "../kyc/ConditionaKycForm";
import KycL2Form from "../Form/KycL2Form";

function KycGlobalModals() {
  const kycModalFlowState = useSelector(kycModalFlow);
  const dispatch = useDispatch();

  const closeKycModal = () => dispatch(exitKycFlow());

  const successKycModal = () => dispatch(successKyc());

  return (
    <>
      <Dialog open={kycModalFlowState === "upgradeKyc"}>
        <ModalLayout>
          <ModalLayoutHeading>
            <ModalLayoutTitle
              title="احراز هویت"
              subtitle="برای تکمیل احراز هویت پایه، اطلاعات زیر را وارد کنید"
            />
            <ModalLayoutCloseIcon onClick={closeKycModal} />
          </ModalLayoutHeading>
          <ModalLayoutBody>
            <ConditionaKycForm
              kycL1Form={<KycL1Form onSuccess={successKycModal} />}
              kycL2Form={<KycL2Form />}
            />
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
