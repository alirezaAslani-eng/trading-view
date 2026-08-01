"use client";
import Button from "@/components/ui/Button/Button";
import { Dialog } from "@mui/material";
import { create, useModal } from "@ebay/nice-modal-react";
import { WarningIcon } from "@/components/ui/Icon";
import {
  ConfirmDialog,
  ConfirmDialogPromiseProps,
  DialogAction,
  DialogIcon,
  DialogInfo,
} from "@/components/ui/ConfirmDialog";

const GenericConfirmDialog = create(
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

export { GenericConfirmDialog };
