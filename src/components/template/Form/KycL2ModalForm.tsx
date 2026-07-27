"use client";

import InputText from "@/components/ui/Input/InputText";
import { kycLevel2Config } from "@/packages/react-query";
import kycL2Schema from "@/validations/kyc/kycL2Schema";
import { KycL2SchemaType } from "@/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import safeAsync from "@/utils/app/safeAsync";
import { useDispatch } from "@/packages/redux";
import { exitKycFlow } from "@/redux/features/kyc";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import { kycContent } from "@/content/kyc";
import InputFile from "@/components/ui/Input/InputFile";
import { Typography } from "@mui/material";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";

const activityFields = [
  { value: "software", label: "فناوری اطلاعات" },
  { value: "finance", label: "مالی و حسابداری" },
  { value: "health", label: "پزشکی و سلامت" },
  { value: "education", label: "آموزش" },
  { value: "other", label: "سایر" },
];

function KycL2Form() {
  const dispatch = useDispatch();

  const closeKycModal = () => dispatch(exitKycFlow());

  const mutation = useMutation(
    kycLevel2Config({
      onSuccess: closeKycModal,
      meta: {
        successMessage: "احراز سطح 2 ثبت شد",
      },
    }),
  );

  const form = useForm({ resolver: zodResolver(kycL2Schema) });

  const submitHandler: SubmitHandler<KycL2SchemaType> = async (fields) => {
    await safeAsync(async () => {
      await mutation.mutateAsync(fields);
    });
  };

  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title={kycContent.kycL2FormTitle}
          subtitle={kycContent.kycL2FormSubTitle}
        />
        <ModalLayoutCloseIcon onClick={closeKycModal} />
      </ModalLayoutHeading>

      <ModalLayoutBody>
        <FormLayout onSubmit={form.handleSubmit(submitHandler)}>
          <FormLayoutFieldGroup>
            <FormLayoutField>
              <FormLayoutLable>{"حوزه فعالیت"}</FormLayoutLable>

              <InputSelect placeholder="حوزه فعالیت را انتخاب کنید">
                <InputSelectMenu>
                  {activityFields.map((item) => (
                    <InputSelectItem key={item.value} value={item.value}>
                      {item.label}
                    </InputSelectItem>
                  ))}
                </InputSelectMenu>
              </InputSelect>
            </FormLayoutField>

            <FormLayoutField>
              <FormLayoutLable>{"شغل"}</FormLayoutLable>
              <InputText placeholder="شغل خود را وارد کنید" />
            </FormLayoutField>
          </FormLayoutFieldGroup>

          <FormLayoutField>
            <FormLayoutLable>{"کد پستی"}</FormLayoutLable>
            <InputText placeholder="کد پستی خود را وارد کنید" />
          </FormLayoutField>

          <FormLayoutField>
            <FormLayoutLable>{"آدرس"}</FormLayoutLable>
            <InputText
              placeholder="آدرس محل سکونت را وارد کنید"
              //@ts-ignore
              textarea
            />
          </FormLayoutField>

          <FormLayoutField>
            <FormLayoutLable>{kycContent.kycL2PostalCodeLabel}</FormLayoutLable>

            <Controller
              name="file"
              control={form.control}
              render={({
                field: { onChange, value, ...field },
                fieldState,
                formState,
              }) => (
                <>
                  <InputFile
                    {...field}
                    multiple
                    error={!!fieldState.error?.message}
                    disabled={formState.isSubmitting}
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []);
                      onChange(files);
                    }}
                  />

                  {!!fieldState.error?.message && (
                    <Typography variant="body3" sx={{ color: "text.error" }}>
                      {fieldState.error?.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </FormLayoutField>

          <FormLayoutSubmit disabled={form.formState.isSubmitting}>
            {kycContent.upgradeKycSubmitButton}
          </FormLayoutSubmit>
        </FormLayout>
      </ModalLayoutBody>
    </ModalLayout>
  );
}

export default KycL2Form;
