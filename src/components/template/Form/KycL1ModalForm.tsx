"use client";
import { DAYS, MONTHS, YEARS } from "@/constant/app/date";
import { kycLevel1Config, kycStatusConfig } from "@/packages/react-query";
import safeAsync from "@/utils/app/safeAsync";
import kvcL1Schema from "@/validations/kyc/kycL1Schema";
import { KycL1SchemaInput, KycL1SchemaOutput } from "@/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { promiseAlert } from "@/packages/react-hot-toast";
import { exitKycFlow, successKyc } from "@/redux/features/kyc";
import { useDispatch } from "@/packages/redux";
import InputText from "@/components/ui/Input/InputText";
import { kycContent } from "@/content/kyc";
import { LockIcon } from "@/components/ui/Icon";
import InputMarker from "@/components/ui/Marker/InputMarker";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import { FormControl } from "@mui/material";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  FormLayout,
  FormLayoutAlert,
  FormLayoutCheckboxGroup,
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

const defaultValues = {
  nationalId: "",
  isCompany: false,
};

function KycL1ModalForm() {
  const kycStatus = useQuery(kycStatusConfig_);

  const dispatch = useDispatch();

  const kycL1Mutation = useMutation(
    kycLevel1Config({ onSuccess: () => dispatch(successKyc()) })
  );

  const onSubmit: SubmitHandler<KycL1SchemaOutput> = async (fields) => {
    await promiseAlert(
      safeAsync(async () => {
        await kycL1Mutation.mutateAsync(fields);
      }),
      { loading: kycContent.kycL1LoadingAlert }
    );
  };

  const form = useForm<KycL1SchemaInput>({
    resolver: zodResolver(kvcL1Schema),
    defaultValues,
  });

  const isCompany = form.watch("isCompany");

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
        <FormControl disabled={form.formState.isSubmitting}>
          <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
            <FormLayoutAlert>
              {isCompany
                ? kycContent.kycL1CompanyTypeFormAlert
                : kycContent.kycL1UserTypeFormAlert}
            </FormLayoutAlert>
            <FormLayoutFieldGroup>
              {/* // * ----------- National Id ----------- */}

              <FormLayoutField>
                <FormLayoutLable>
                  {isCompany
                    ? kycContent.kycL1CompanyIdLabel
                    : kycContent.kycL1NationalIdLabel}
                </FormLayoutLable>
                <InputText
                  error={!!form.formState.errors?.nationalId?.message}
                  {...form.register("nationalId")}
                  placeholder={
                    isCompany
                      ? kycContent.kycL1CompanyIdPlaceholder
                      : kycContent.kycL1NationalIdPlaceholder
                  }
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
                          disabled={isCompany}
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
                          disabled={isCompany}
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
                          disabled={isCompany}
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

            {/* // * ------------- Checkbox ------------- */}
            <FormLayoutCheckboxGroup>
              <Controller
                control={form.control}
                name="isCompany"
                render={({ field, formState }) => {
                  return (
                    <>
                      <CheckBox
                        checked={field.value}
                        label="حقوقی"
                        disabled={formState.isSubmitting}
                        onChange={({ target: { checked } }) => {
                          if (checked) field.onChange(true);
                        }}
                      />
                      <CheckBox
                        checked={!field.value}
                        label="حقیقی"
                        disabled={formState.isSubmitting}
                        onChange={({ target: { checked } }) => {
                          if (checked) field.onChange(false);
                        }}
                      />
                    </>
                  );
                }}
              />
            </FormLayoutCheckboxGroup>

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
