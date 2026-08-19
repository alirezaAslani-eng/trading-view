"use client";
import { DAYS, MONTHS, YEARS } from "@/constant/app/date";
import { kycStatusConfig } from "@/packages/react-query";
import safeAsync from "@/utils/app/safeAsync";
import { kycL1Schema, KycL1Schema } from "@/validations/kyc/kycL1Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { exitKycFlow, successKyc } from "@/redux/features/kyc";
import { useDispatch } from "@/packages/redux";
import InputText from "@/components/ui/Input/InputText";
import { kycContent } from "@/content/kyc";
import { LockIcon } from "@/components/ui/Icon";
import InputMarker from "@/components/ui/Marker/InputMarker";
import { FormControl } from "@mui/material";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  FormLayout,
  FormLayoutAlert,
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
import { useKycL1Mutation } from "@/v2-architecture/src/features/kyc/hooks";
import { ModalFormProps } from "./types";

const kycStatusConfig_ = kycStatusConfig();

const defaultValues = {
  nationalId: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
};

function KycL1ModalForm({ onClose }: ModalFormProps) {
  const kycStatus = useQuery(kycStatusConfig_);

  const kycL1Mutation = useKycL1Mutation({
    onSuccess: onClose,
  });

  const onSubmit: SubmitHandler<KycL1Schema> = async (fields) => {
    await safeAsync(() => kycL1Mutation.mutateAsync(fields));
  };

  const form = useForm({
    resolver: zodResolver(kycL1Schema),
    defaultValues,
  });

  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title={kycContent.kycL1FormTitle}
          subtitle={kycContent.kycL1FormSubTitle}
        />
        <ModalLayoutCloseIcon onClick={onClose} />
      </ModalLayoutHeading>

      <ModalLayoutBody>
        <FormControl disabled={form.formState.isSubmitting}>
          <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
            <FormLayoutAlert>
              {kycContent.kycL1UserTypeFormAlert}
            </FormLayoutAlert>

            <FormLayoutFieldGroup>
              {/* // * ----------- National Id ----------- */}
              <FormLayoutField>
                <FormLayoutLable>
                  {kycContent.kycL1NationalIdLabel}
                </FormLayoutLable>
                <InputText
                  error={!!form.formState.errors?.nationalId?.message}
                  {...form.register("nationalId")}
                  placeholder={kycContent.kycL1NationalIdPlaceholder}
                />
              </FormLayoutField>

              {/* // * ----------- Phone number ----------- */}
              <FormLayoutField>
                <FormLayoutLable>
                  {kycContent.kycL1PhoneNumberLabel}
                </FormLayoutLable>
                <InputMarker icon={<LockIcon fontSize="small" />} left="12px">
                  <InputText
                    placeholder="شماره موبایل خود را وارد کنید"
                    disabled
                    value={kycStatus?.data?.phoneNumber ?? ""}
                  />
                </InputMarker>
              </FormLayoutField>
            </FormLayoutFieldGroup>

            {/* // * ----------- Birth Date ----------- */}
            <FormLayoutField>
              <FormLayoutLable>
                {kycContent.kycL1BirthDateLabel}
              </FormLayoutLable>
              <FormLayoutFieldGroup>
                <FormLayoutField>
                  <Controller
                    control={form.control}
                    name="birthYear"
                    render={({ field, fieldState }) => {
                      return (
                        <InputSelect
                          error={!!fieldState.error?.message}
                          placeholder={kycContent.kycL1BirthYearPlaceholder}
                          {...field}
                        >
                          <InputSelectMenu>
                            {YEARS.map(({ label, value }) => {
                              return (
                                <InputSelectItem value={value}>
                                  {label}
                                </InputSelectItem>
                              );
                            })}
                          </InputSelectMenu>
                        </InputSelect>
                      );
                    }}
                  />
                </FormLayoutField>

                <FormLayoutField>
                  <Controller
                    control={form.control}
                    name="birthMonth"
                    render={({ field, fieldState }) => {
                      return (
                        <InputSelect
                          error={!!fieldState.error?.message}
                          placeholder={kycContent.kycL1BirthMonthPlaceholder}
                          {...field}
                        >
                          <InputSelectMenu>
                            {MONTHS.map(({ label, value }) => {
                              return (
                                <InputSelectItem value={value}>
                                  {label}
                                </InputSelectItem>
                              );
                            })}
                          </InputSelectMenu>
                        </InputSelect>
                      );
                    }}
                  />
                </FormLayoutField>

                <FormLayoutField>
                  <Controller
                    control={form.control}
                    name="birthDay"
                    render={({ field, fieldState }) => {
                      return (
                        <InputSelect
                          error={!!fieldState.error?.message}
                          placeholder={kycContent.kycL1BirthDayPlaceholder}
                          {...field}
                        >
                          <InputSelectMenu>
                            {DAYS.map(({ label, value }) => {
                              return (
                                <InputSelectItem value={value}>
                                  {label}
                                </InputSelectItem>
                              );
                            })}
                          </InputSelectMenu>
                        </InputSelect>
                      );
                    }}
                  />
                </FormLayoutField>
              </FormLayoutFieldGroup>
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

export default KycL1ModalForm;
