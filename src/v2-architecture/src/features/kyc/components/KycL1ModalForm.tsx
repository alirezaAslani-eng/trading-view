"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { kycLevel1Config } from "../react-query";
import { useDispatch } from "@/v2-architecture/src/store";
import { exitKycFlow, successKyc } from "../redux";
import { kvcL1Schema, type KycL1Schema } from "../validations";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { notifyLoading } from "@/v2-architecture/src/shared/lib/react-hot-toast";
import { safeAsync } from "@/v2-architecture/src/shared/utils";
import { kycContent } from "@/content/kyc";
import { zodResolver } from "@hookform/resolvers/zod";
import { kycStatusConfig } from "@/v2-architecture/src/entity/kyc";
import { DAYS, MONTHS, YEARS } from "@/v2-architecture/src/shared/constants";
import {
  FormLayout,
  FormLayoutAlert,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
  InputMarker,
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
  InputText,
  LockIcon,
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/v2-architecture/src/shared/ui";

const kycStatusConfig_ = kycStatusConfig();

function KycL1ModalForm() {
  const kycStatus = useQuery(kycStatusConfig_);

  const dispatch = useDispatch();

  const kycL1Mutation = useMutation(
    kycLevel1Config({ onSuccess: () => dispatch(successKyc()) }),
  );

  const onSubmit: SubmitHandler<KycL1Schema> = async (fields) => {
    await notifyLoading(
      safeAsync(async () => {
        await kycL1Mutation.mutateAsync(fields);
      }),
      { loading: kycContent.kycL1LoadingAlert },
    );
  };

  const form = useForm({
    resolver: zodResolver(kvcL1Schema),
    defaultValues: {
      birthDay: "",
      birthMonth: "",
      birthYear: "",
    },
  });

  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title={kycContent.kycL1FormTitle}
          subtitle={kycContent.kycL1FormSubTitle}
        />
        <ModalLayoutCloseIcon onClick={() => dispatch(exitKycFlow())} />
      </ModalLayoutHeading>
      <ModalLayoutBody>
        <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
          <FormLayoutAlert>{kycContent.kycL1FormAlert}</FormLayoutAlert>
          <FormLayoutFieldGroup>
            {/* // * ----------- National Id ----------- */}
            <FormLayoutField>
              <FormLayoutLable>
                {kycContent.kycL1NationalIdLabel}
              </FormLayoutLable>
              <InputText
                placeholder={kycContent.kycL1NationalIdPlaceholder}
                error={!!form.formState.errors?.nationalId?.message}
                {...form.register("nationalId")}
              />
            </FormLayoutField>
            {/* // * ----------- Phone number ----------- */}
            <FormLayoutField>
              <FormLayoutLable>
                {kycContent.kycL1PhoneNumberLabel}
              </FormLayoutLable>
              <InputMarker
                icon={<LockIcon fontSize="small" />}
                left="12px" // یا right="12px" بسته به محل نمایش
              >
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
            <FormLayoutLable>{kycContent.kycL1BirthDateLabel}</FormLayoutLable>
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

          <FormLayoutSubmit disabled={form.formState.isSubmitting}>
            {kycContent.upgradeKycSubmitButton}
          </FormLayoutSubmit>
        </FormLayout>
      </ModalLayoutBody>
    </ModalLayout>
  );
}

export default KycL1ModalForm;
