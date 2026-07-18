"use client";

import { ModalLayout } from "@/components/ui/Layout/ModalLayout";
import Button from "@/components/ui/Button/Button";
import {  Typography, Box } from "@mui/material";
import { useDispatch } from "@/packages/redux";
import { exitKycFlow, upgradeKycLevel } from "@/redux/features/kyc";

function NeedKycModal() {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(exitKycFlow());
  };

  const handleUpgrade = () => {
    dispatch(upgradeKycLevel());
  };

  return (
    <ModalLayout>
      <Typography
        variant="button3"
        sx={{
          color: "common.white",
          textAlign: "center",
          fontWeight: 700,
          mb: 1,
        }}
      >
        احراز هویت الزامی است
      </Typography>

      <Typography
        variant="caption1"
        sx={{
          color: "common.white",
          textAlign: "center",
          mb: 3,
        }}
      >
         ابتدا باید احراز هویت خود را تکمیل کنید.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={handleUpgrade}
          sx={{
            minWidth: 110,
            borderRadius: "24px",
          }}
        >
          احراز هویت
        </Button>

        <Button
          variant="on-surface"
          size="small"
          onClick={handleClose}
          sx={{
            minWidth: 110,
            borderRadius: "24px",
          }}
        >
          انصراف
        </Button>
      </Box>
    </ModalLayout>
  );
}

export default NeedKycModal;
