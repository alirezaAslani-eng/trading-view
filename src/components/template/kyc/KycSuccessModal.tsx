import { KycUpgradeStatus, KycUpgradeStatusAction } from "./KycUpgradeStatus";
import { ModalLayout } from "@/components/ui/Layout/ModalLayout";
import Button from "@/components/ui/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { kycStatusConfig } from "@/packages/react-query";
import { getNextKycLevel } from "@/utils";
import BouncingDotsLoader from "@/components/ui/Fallback/BounceCircleLoader";
import { useDispatch } from "@/packages/redux";
import { exitKycFlow, upgradeKycLevel } from "@/redux/features/kyc";

const queryConfig = kycStatusConfig();
function KycSuccessModal() {
  const kycStatus = useQuery(queryConfig);
  const isKycStatusSuccess = kycStatus.status === "success";

  const dispathc = useDispatch();
  const closeKycSuccessModal = () => dispathc(exitKycFlow());
  const openUpgradeKycModal = () => dispathc(upgradeKycLevel());

  return (
    <ModalLayout>
      <KycUpgradeStatus>
        <KycUpgradeStatusAction>
          <Button
            variant="contained"
            size="large"
            disabled={!isKycStatusSuccess}
            onClick={openUpgradeKycModal}
          >
            {!isKycStatusSuccess ? (
              <BouncingDotsLoader />
            ) : (
              <>
                احراز هویت سطح {getNextKycLevel(kycStatus.data.kycLevel)?.order}
              </>
            )}
          </Button>
          <Button
            variant="on-surface"
            size="large"
            onClick={closeKycSuccessModal}
            sx={{ borderRadius: "28px" }}
          >
            {"داشبورد"}
          </Button>
        </KycUpgradeStatusAction>
      </KycUpgradeStatus>
    </ModalLayout>
  );
}

export default KycSuccessModal;
