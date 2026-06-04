"use client";
import { DAYS, MONTHS, YEARS } from "@/constant/app/date";
import { kycLevel1Config, kycStatusConfig } from "@/packages/react-query";
import safeAsync from "@/utils/app/safeAsync";
import kvcL1Schema from "@/validations/kyc/kycL1Schema";
import { KycL1SchemaType } from "@/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MutationOptions, useQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutAlert,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import { ResponseErrorType } from "@/types";
import { promiseAlert } from "@/packages/react-hot-toast";
import { useKycMutation } from "@/hooks/features/kyc/useKycMutation";

const kycStatusConfig_ = kycStatusConfig();
const kycL1Config = kycLevel1Config();

interface KycL1FormProps extends Pick<
  MutationOptions<void, ResponseErrorType, KycL1SchemaType>,
  "onSuccess"
> {}

function KycL1Form(mutationProps: KycL1FormProps) {
  const kycStatus = useQuery(kycStatusConfig_);
  const kycL1Mutation = useKycMutation({ ...kycL1Config, ...mutationProps });

  const onSubmit: SubmitHandler<KycL1SchemaType> = async (fields) => {
    await promiseAlert(
      safeAsync(async () => {
        await kycL1Mutation.mutateAsync(fields);
      }),
      { loading: "صبر کنید" },
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
    <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
      <FormLayoutAlert>
        {"شماره شبا باید متعلق به صاحب کد ملی باشد"}
      </FormLayoutAlert>
      <FormLayoutFieldGroup>
        {/* // * ----------- National Id ----------- */}
        <FormLayoutField>
          <FormLayoutLable>{"کد ملی"}</FormLayoutLable>
          <InputText
            placeholder="کد ملی را وارد کنید"
            error={!!form.formState.errors?.nationalId?.message}
            {...form.register("nationalId")}
          />
        </FormLayoutField>
        {/* // * ----------- Phone number ----------- */}
        <FormLayoutField>
          <FormLayoutLable>{"شماره موبایل"}</FormLayoutLable>
          <InputText
            placeholder="شماره موبایل خود را وارد کنید"
            disabled
            value={kycStatus?.data?.phoneNumber ?? ""}
          />
        </FormLayoutField>
      </FormLayoutFieldGroup>

      {/* // * ----------- Birth Date ----------- */}
      <FormLayoutField>
        <FormLayoutLable>{"تاریخ تولد"}</FormLayoutLable>
        <FormLayoutFieldGroup>
          <FormLayoutField>
            <Controller
              control={form.control}
              name="birthYear"
              render={({ field, fieldState }) => {
                return (
                  <InputSelect
                    error={!!fieldState.error?.message}
                    placeholder="سال"
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
                    placeholder="ماه"
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
                    placeholder="روز"
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
        {"ثبت اطلاعات"}
      </FormLayoutSubmit>
    </FormLayout>
  );
}

export default KycL1Form;
