"use client";
import { useState } from "react";
import { Dialog } from "@mui/material";
import Button from "@/components/ui/Button/Button";
import Checkbox from "@/components/ui/Checkbox/CheckBox";
import { Stack, Typography } from "@mui/material";
import ScrollContainer from "../ScrollContainer/ScrollContainer";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";

export type AgreementDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  rules: string;
  agreementLabel?: string;
  confirmLabel?: string;
};

// ! This component will be refactored
export function AgreementDialog({
  open,
  onClose,
  onConfirm,
  title,
  rules,
  agreementLabel = "شرایط و قوانین را مطالعه کردم و می‌پذیرم",
  confirmLabel = "تایید",
}: AgreementDialogProps) {
  const [agreed, setAgreed] = useState(false);

  const handleClose = () => {
    setAgreed(false);
    onClose();
  };

  const handleConfirm = () => {
    setAgreed(true);
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <ModalLayout>
        <ModalLayoutHeading>
          <ModalLayoutTitle title={title} />
          <ModalLayoutCloseIcon onClick={handleClose} />
        </ModalLayoutHeading>

        <ModalLayoutBody sx={{ mt: 3 }}>
          <Stack sx={{ gap: "20px" }}>
            <ScrollContainer sx={{ maxHeight: "400px", pl: "6px" }}>
              <Typography
                variant="body3"
                sx={{ color: "text.secondary", py: "1px" }}
              >
                {rules}
              </Typography>
            </ScrollContainer>

            <Checkbox
              checked={agreed}
              label={agreementLabel}
              onChange={(e) => setAgreed(e.target.checked)}
            />

            <Stack direction="row" sx={{ gap: "12px" }}>
              <Button
                variant="contained"
                fullWidth
                disabled={!agreed}
                onClick={handleConfirm}
              >
                {confirmLabel}
              </Button>
              <Button variant="on-surface" fullWidth onClick={handleClose}>
                {"انصراف"}
              </Button>
            </Stack>
          </Stack>
        </ModalLayoutBody>
      </ModalLayout>
    </Dialog>
  );
}
