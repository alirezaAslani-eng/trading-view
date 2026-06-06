"use client";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import AddProductForm from "../Form/AddProductForm";

function AddProductModalForm(props: { onClose?: () => void }) {
  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title="افزودن محصول"
          subtitle="افزودن محصول جدید به لیست بازار"
        />
        <ModalLayoutCloseIcon onClick={props.onClose} />
      </ModalLayoutHeading>
      <ModalLayoutBody>
        <AddProductForm />
      </ModalLayoutBody>
    </ModalLayout>
  );
}

export default AddProductModalForm;
