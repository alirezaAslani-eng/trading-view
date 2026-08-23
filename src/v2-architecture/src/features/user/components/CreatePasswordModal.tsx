"use client";
import { ModalFormProps } from "@/components/template/Form/types";
import { createPasswordConfig } from "../react-query";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CreatePasswordSchema, createPasswordSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import safeAsync from "@/utils/app/safeAsync";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import { FormControl } from "@mui/material";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldError,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import InputPassword from "@/components/ui/Input/InputPassword";

const createPasswordModalContent = {
  title: "تنظیم رمز عبور",
  subtitle: "برای ورود به پنل، یک رمز عبور برای حساب خود تنظیم کنید",
  newPasswordPlaceholder: "رمز عبور جدید را وارد کنید",
  confirmPasswordPlaceholder: "تکرار رمز عبور",
  submitLabel: "ایجاد رمز",
};

interface CreatePasswordModalProps extends ModalFormProps {
  onSuccess?: () => void;
}
export default function CreatePasswordModal({
  onClose,
  onSuccess,
}: CreatePasswordModalProps) {
  const form = useForm({
    resolver: zodResolver(createPasswordSchema),
  });

  const mutation = useMutation(
    createPasswordConfig({
      onSuccess: () => {
        onSuccess?.();
        form.reset();
      },
    }),
  );

  const submitHandler = async (fields: CreatePasswordSchema) => {
    await safeAsync(() => mutation.mutateAsync(fields));
  };

  return (
    <ModalLayout onSubmit={form.handleSubmit(submitHandler)}>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title={createPasswordModalContent.title}
          subtitle={createPasswordModalContent.subtitle}
        />
        <ModalLayoutCloseIcon onClick={onClose} />
      </ModalLayoutHeading>
      <ModalLayoutBody>
        <FormControl disabled={form.formState.isSubmitting} fullWidth>
          <FormLayout>
            <FormLayoutField>
              <InputPassword
                placeholder={createPasswordModalContent.newPasswordPlaceholder}
                error={!!form.formState.errors.NewPassword}
                size="large"
                {...form.register("NewPassword")}
              />
              <FormLayoutFieldError
                message={form.formState.errors.NewPassword?.message}
              />
            </FormLayoutField>

            <FormLayoutField>
              <InputPassword
                size="large"
                error={!!form.formState.errors.confirmPassword}
                {...form.register("confirmPassword")}
                placeholder={
                  createPasswordModalContent.confirmPasswordPlaceholder
                }
              />
              <FormLayoutFieldError
                message={form.formState.errors.confirmPassword?.message}
              />
            </FormLayoutField>

            <FormLayoutSubmit>
              {createPasswordModalContent.submitLabel}
            </FormLayoutSubmit>
          </FormLayout>
        </FormControl>
      </ModalLayoutBody>
    </ModalLayout>
  );
}
