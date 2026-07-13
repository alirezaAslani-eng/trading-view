"use client";
import { Stack, Typography } from "@mui/material";
import Button from "../Button/Button";
import {
  BANK_MODAL_STATE,
  useBankModal,
} from "@/context/feature/bank/BankModal";

function BankSelectInputFallback() {
  const bankModal = useBankModal()!;
  console.log({ bankModal });

  return (
    <Stack sx={{ py: "12px", alignItems: "center", gap: "12px" }}>
      <Typography
        variant="body3"
        sx={{ color: "text.caption", textAlign: "center" }}
      >
        {"پیش از ایجاد یک تراکنش حساب بانکی خود را ایجاد کنید"}
      </Typography>

      <Button
        variant="on-surface"
        size="small"
        sx={{ width: "fit-content" }}
        onClick={() => bankModal.openModal(BANK_MODAL_STATE.cardNumber)}
      >
        {"ایجاد حساب"}
      </Button>
    </Stack>
  );
}

export default BankSelectInputFallback;
