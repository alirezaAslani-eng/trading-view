"use client";
import { DAYS, MONTHS, YEARS } from "@/constant/app/date";
import { kycLevel1Config, kycStatusConfig } from "@/packages/react-query";
import safeAsync from "@/utils/app/safeAsync";
import kvcL1Schema from "@/validations/kyc/kycL1Schema";
import { KycL1SchemaType } from "@/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { promiseAlert } from "@/packages/react-hot-toast";
import { exitKycFlow, successKyc } from "@/redux/features/kyc";
import { useDispatch } from "@/packages/redux";
import InputText from "@/components/ui/Input/InputText";
import { kycContent } from "@/content/kyc";
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

const kycStatusConfig_ = kycStatusConfig();

function KycL1ModalForm() {
  const kycStatus = useQuery(kycStatusConfig_);

  const dispatch = useDispatch();

  const kycL1Mutation = useMutation(
    kycLevel1Config({ onSuccess: () => dispatch(successKyc()) }),
  );

  const onSubmit: SubmitHandler<KycL1SchemaType> = async (fields) => {
    await promiseAlert(
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
              <InputText
                placeholder="شماره موبایل خود را وارد کنید"
                disabled
                value={kycStatus?.data?.phoneNumber ?? ""}
              />
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
