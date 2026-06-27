"use client";

import { useState } from "react";
import { Dialog } from "@mui/material";

import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import AddRoleForm from "../Form/AddGroupForm";
type AddGroupModalProps = {
  onClose?: () => void;
};

function AddGroupModal({onClose }: AddGroupModalProps) {

  return (
      <ModalLayout>
        <ModalLayoutHeading>
          <ModalLayoutTitle
            title="نقش جدید"
            subtitle="اطلاعات نقش را وارد کنید."
          />
          <ModalLayoutCloseIcon onClick={onClose} />
        </ModalLayoutHeading>
        <ModalLayoutBody>
          <AddRoleForm/>
        </ModalLayoutBody>
      </ModalLayout>
  );
}

export default AddGroupModal;