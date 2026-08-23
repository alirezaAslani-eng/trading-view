"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormControl } from "@mui/material";
import safeAsync from "@/utils/app/safeAsync";
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
import { changePasswordSchema, ChangePasswordSchema } from "../validation";
import { changePasswordConfig } from "../react-query";
import { ModalFormProps } from "@/components/template/Form/types";
import InputPassword from "@/components/ui/Input/InputPassword";

function ChangePasswordModal({ onClose }: ModalFormProps) {
  const form = useForm({ resolver: zodResolver(changePasswordSchema) });

  const mutation = useMutation(
    changePasswordConfig({
      onSuccess: () => {
        onClose?.();
        form.reset();
      },
    }),
  );

  const submitHandler = (fields: ChangePasswordSchema) => {
    return safeAsync(() => mutation.mutateAsync(fields));
  };

  return (
    <ModalLayout onSubmit={form.handleSubmit(submitHandler)}>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title="تغییر رمز عبور"
          subtitle="برای تغییر رمز عبور، اطلاعات زیر را وارد کنید."
        />
        <ModalLayoutCloseIcon onClick={onClose} />
      </ModalLayoutHeading>

      <ModalLayoutBody>
        <FormControl disabled={form.formState.isSubmitting}>
          <FormLayout>
            <FormLayoutField>
              <FormLayoutLable>{"رمز عبور فعلی"}</FormLayoutLable>
              <InputPassword
                placeholder="رمز عبور فعلی خود را وارد کنید"
                {...form.register("currentPassword")}
                error={!!form.formState.errors.currentPassword}
              />
              <FormLayoutFieldError
                message={form.formState.errors.currentPassword?.message}
              />
            </FormLayoutField>

            <FormLayoutField>
              <FormLayoutLable>{"رمز عبور جدید"}</FormLayoutLable>
              <InputPassword
                placeholder="رمز عبور جدید را وارد کنید"
                {...form.register("newPassword")}
                error={!!form.formState.errors.newPassword}
              />
              <FormLayoutFieldError
                message={form.formState.errors.newPassword?.message}
              />
            </FormLayoutField>

            <FormLayoutField>
              <FormLayoutLable>{"تکرار رمز عبور جدید"}</FormLayoutLable>
              <InputPassword
                placeholder="رمز عبور جدید را دوباره وارد کنید"
                {...form.register("confirmNewPassword")}
                error={!!form.formState.errors.confirmNewPassword}
              />
              <FormLayoutFieldError
                message={form.formState.errors.confirmNewPassword?.message}
              />
            </FormLayoutField>

            <FormLayoutSubmit>{"تغییر رمز عبور"}</FormLayoutSubmit>
          </FormLayout>
        </FormControl>
      </ModalLayoutBody>
    </ModalLayout>
  );
}

export default ChangePasswordModal;
