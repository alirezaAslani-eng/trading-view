"use client";

import { EmailIcon, LockIcon } from "@/components/ui/Icon";
import { Dialog, Stack } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { dashboardInfoConfig } from "@/packages/react-query";
import ChangePasswordModal from "../ChangePasswordModal";
import CreatePasswordModal from "../CreatePasswordModal";
import { AccountSettingCard } from "./AccountSettingCard";
import { UpdateEmailModal } from "../UpdateEmailModal";

type AccountSettingModal =
  | "create-password"
  | "change-password"
  | "email"
  | null;

export function AccountSetting() {
  //#region // * ------------ Modal State ------------
  const [activeModal, setActiveModal] = useState<AccountSettingModal>(null);

  const handleOpenModal = (modal: Exclude<AccountSettingModal, null>) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };
  //#endregion

  //#region // * ------------ Data : Dashboard Info ------------
  const query = useQuery(dashboardInfoConfig());

  if (!query.isSuccess) return; // TODO Skeleton needed

  const { hasPassword, email } = query.data;
  //#endregion

  return (
    <>
      <Stack sx={{ gap: 2 }}>
        <AccountSettingCard
          disabled={hasPassword}
          icon={<EmailIcon />}
          title={email ?? "ایمیل"}
          description="تغیر یا افزودن ایمیل کاربری"
          onClick={() => handleOpenModal("email")}
        />

        <AccountSettingCard
          disabled={hasPassword}
          icon={<LockIcon />}
          title="ساخت رمز عبور"
          description="برای حساب خود یک رمز عبور تنظیم کنید."
          onClick={() => handleOpenModal("create-password")}
        />

        <AccountSettingCard
          disabled={!hasPassword}
          icon={<LockIcon />}
          title="تغییر رمز عبور"
          description="رمز عبور فعلی حساب خود را تغییر دهید."
          onClick={() => handleOpenModal("change-password")}
        />
      </Stack>

      {/* // * ----------- Modals ----------- */}
      <Dialog
        open={activeModal === "create-password"}
        onClose={handleCloseModal}
      >
        <CreatePasswordModal onClose={handleCloseModal} />
      </Dialog>

      <Dialog
        open={activeModal === "change-password"}
        onClose={handleCloseModal}
      >
        <ChangePasswordModal onClose={handleCloseModal} />
      </Dialog>

      <Dialog open={activeModal === "email"} onClose={handleCloseModal}>
        <UpdateEmailModal
          onClose={handleCloseModal}
          defaultValues={{ email: email ?? "" }}
        />
      </Dialog>
    </>
  );
}
