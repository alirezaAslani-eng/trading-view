// --- UpdateEmailModal.tsx ---
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormControl } from "@mui/material";
import safeAsync from "@/utils/app/safeAsync";
import InputText from "@/components/ui/Input/InputText";
import { UpdateEmailSchema, updateEmailSchema } from "../validation";
import { updateEmailConfig } from "../react-query";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldError,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

type UpdateEmailModalProps = {
  onClose: () => void;
  onSuccess?: () => void;
  defaultValues?: UpdateEmailSchema;
};

export function UpdateEmailModal({
  onClose,
  onSuccess,
  defaultValues,
}: UpdateEmailModalProps) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(updateEmailSchema),
  });

  const mutation = useMutation(
    updateEmailConfig({
      onSuccess: () => {
        //#region // ! DRY : All the modal forms call onSuccess & onClose and reset the form state
        form.reset();
        onClose();
        onSuccess?.();
        //#endregion
      },
    }),
  );

  const submitHandler = (fields: UpdateEmailSchema) => {
    return safeAsync(() => mutation.mutateAsync(fields));
  };

  return (
    <ModalLayout onSubmit={form.handleSubmit(submitHandler)}>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title="ویرایش ایمیل"
          subtitle="ایمیل جدید خود را وارد کنید."
        />
        <ModalLayoutCloseIcon onClick={onClose} />
      </ModalLayoutHeading>

      <ModalLayoutBody>
        <FormControl disabled={form.formState.isSubmitting}>
          <FormLayout>
            <FormLayoutField>
              <FormLayoutLable>{"ایمیل"}</FormLayoutLable>
              <InputText
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                {...form.register("email")}
                error={!!form.formState.errors.email}
              />
              <FormLayoutFieldError
                message={form.formState.errors.email?.message}
              />
            </FormLayoutField>

            <FormLayoutSubmit>{"ذخیره تغییرات"}</FormLayoutSubmit>
          </FormLayout>
        </FormControl>
      </ModalLayoutBody>
    </ModalLayout>
  );
}
