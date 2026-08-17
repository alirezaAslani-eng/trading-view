"use client";
import Button from "@/components/ui/Button/Button";
import { Dialog } from "@mui/material";
import { create, useModal } from "@ebay/nice-modal-react";
import { WarningIcon } from "@/components/ui/Icon";
import {
  AgreementDialog,
  AgreementDialogProps,
} from "@/components/ui/AgreementDialog/AgreementDialog";
import {
  ConfirmDialog,
  ConfirmDialogPromiseProps,
  DialogAction,
  DialogIcon,
  DialogInfo,
} from "@/components/ui/ConfirmDialog";

export const GenericConfirmDialog = create(
  ({
    description = "آیا از انجام این عملیات مطمئن هستید؟",
    title = "تأیید انجام عملیات",
    color = "error",
    acceptText = "تأیید",
    rejectText = "انصراف",
    icon = <WarningIcon />,
  }: ConfirmDialogPromiseProps) => {
    const modal = useModal();

    const resolveHandler = () => {
      modal.resolve(true);
      modal.hide();
    };

    const rejectHandler = () => {
      modal.resolve(false);
      modal.hide();
    };

    return (
      <Dialog open={modal.visible} onClose={rejectHandler}>
        <ConfirmDialog color={color} onClose={rejectHandler}>
          <DialogIcon>{icon}</DialogIcon>

          <DialogInfo title={title} description={description} />

          <DialogAction>
            <Button onClick={resolveHandler}>{acceptText}</Button>

            <Button onClick={rejectHandler}>{rejectText}</Button>
          </DialogAction>
        </ConfirmDialog>
      </Dialog>
    );
  },
);

export const AgreementPromiseDialog = create(
  ({
    title,
    rules,
    agreementLabel,
    confirmLabel,
  }: Omit<AgreementDialogProps, "onClose" | "open" | "onConfirm">) => {
    const modal = useModal();

    const resolveHandler = () => {
      modal.resolve(true);
      modal.hide();
    };

    const rejectHandler = () => {
      modal.resolve(false);
      modal.hide();
    };

    return (
      <AgreementDialog
        open={modal.visible}
        onClose={rejectHandler}
        onConfirm={resolveHandler}
        title={title}
        rules={rules}
        agreementLabel={agreementLabel}
        confirmLabel={confirmLabel}
      />
    );
  },
);
