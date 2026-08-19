"use client";

import InputText from "@/components/ui/Input/InputText";
import { kycLevel2Config } from "@/packages/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { FormControl, Typography } from "@mui/material";
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
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import kycL2Schema from "@/validations/kyc/kycL2Schema";
import { KycL2Variables } from "@/api";
import {
  activityFieldsConfig,
  addressInquiryConfig,
} from "@/v2-architecture/src/features/kyc/react-query";
import useUpdateEffect from "@/hooks/app/useUpdateEffect";
import safeAsync from "@/utils/app/safeAsync";
import { ModalFormProps } from "./types";

function KycL2Form({ onClose }: ModalFormProps) {
  //#region // * ------------ Form Mutation ------------

  const mutation = useMutation(
    kycLevel2Config({
      onSuccess: onClose,
      meta: {
        successMessage: "احراز سطح 2 ثبت شد",
      },
    }),
  );

  //#endregion // * ------------ Form Mutation ------------

  //#region // * ------------ Form State ------------

  const form = useForm({
    resolver: zodResolver(kycL2Schema),
    defaultValues: {
      activityField: "",
      city: "",
      fullAddress: "",
      jobTitle: "",
      postalCode: "",
      state: "",
    },
  });

  const submitHandler = async (fields: KycL2Variables) => {
    await safeAsync(() => mutation.mutateAsync(fields));
  };

  //#endregion // * ------------ Form State ------------

  //#region // * ------------ Form Data ------------

  // * Activity Fields
  const { data: activityFields = [] } = useQuery(activityFieldsConfig());

  // * Address Inquiry
  const postalCode = form.watch("postalCode");

  const { data: addressInquiry } = useQuery(addressInquiryConfig(postalCode));

  useUpdateEffect(() => {
    if (!addressInquiry) return;

    form.setValue("state", addressInquiry.state);
    form.setValue("city", addressInquiry.city);
    form.setValue("fullAddress", addressInquiry.fullAddress);
  }, [addressInquiry]);

  //#endregion // * ------------ Form Data ------------

  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title={kycContent.kycL2FormTitle}
          subtitle={kycContent.kycL2FormSubTitle}
        />

        <ModalLayoutCloseIcon onClick={onClose} />
      </ModalLayoutHeading>

      <ModalLayoutBody>
        <FormControl disabled={form.formState.isSubmitting}>
          <FormLayout onSubmit={form.handleSubmit(submitHandler)}>
            <FormLayoutFieldGroup>
              <FormLayoutField>
                <FormLayoutLable>{"حوزه فعالیت"}</FormLayoutLable>

                <Controller
                  control={form.control}
                  name="activityField"
                  render={({ field, fieldState }) => (
                    <InputSelect
                      placeholder="حوزه فعالیت را انتخاب کنید"
                      error={!!fieldState.error?.message}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputSelectMenu>
                        {activityFields.map((item) => (
                          <InputSelectItem key={item.value} value={item.value}>
                            {item.label}
                          </InputSelectItem>
                        ))}
                      </InputSelectMenu>
                    </InputSelect>
                  )}
                />
              </FormLayoutField>

              <FormLayoutField>
                <FormLayoutLable>{"شغل"}</FormLayoutLable>

                <InputText
                  placeholder="شغل خود را وارد کنید"
                  {...form.register("jobTitle")}
                  error={!!form.formState.errors.jobTitle}
                />
              </FormLayoutField>
            </FormLayoutFieldGroup>

            <FormLayoutFieldGroup>
              <FormLayoutField>
                <FormLayoutLable>{"کد پستی"}</FormLayoutLable>

                <InputText
                  placeholder="کد پستی خود را وارد کنید"
                  {...form.register("postalCode")}
                  error={!!form.formState.errors.postalCode}
                />
              </FormLayoutField>

              <FormLayoutField>
                <FormLayoutLable>{"منطقه"}</FormLayoutLable>

                <InputText
                  placeholder="عدد منطقه را وارد کنید"
                  {...form.register("state")}
                  error={!!form.formState.errors.state}
                />
              </FormLayoutField>
            </FormLayoutFieldGroup>

            <FormLayoutField>
              <FormLayoutLable>{"شهر"}</FormLayoutLable>
              <InputText
                placeholder="نام شهر را وارد کنید"
                {...form.register("city")}
                error={!!form.formState.errors.city}
              />
            </FormLayoutField>

            <FormLayoutField>
              <FormLayoutLable>{"آدرس"}</FormLayoutLable>

              <InputText
                placeholder="آدرس محل سکونت خود را وارد کنید"
                //@ts-ignore
                textarea
                {...form.register("fullAddress")}
                error={!!form.formState.errors.fullAddress}
              />
            </FormLayoutField>

            <FormLayoutField>
              <FormLayoutLable>
                {kycContent.kycL2PostalCodeLabel}
              </FormLayoutLable>

              <Controller
                name="file"
                control={form.control}
                render={({
                  field: { onChange, value, ...field },
                  fieldState,
                }) => (
                  <>
                    <InputFile
                      {...field}
                      multiple
                      error={!!fieldState.error?.message}
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

            <FormLayoutSubmit>
              {kycContent.upgradeKycSubmitButton}
            </FormLayoutSubmit>
          </FormLayout>
        </FormControl>
      </ModalLayoutBody>
    </ModalLayout>
  );
}

export default KycL2Form;
