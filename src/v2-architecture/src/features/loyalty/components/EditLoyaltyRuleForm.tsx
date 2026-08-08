"use client";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormControl, Stack } from "@mui/material";
import safeAsync from "@/utils/app/safeAsync";
import InputText from "@/components/ui/Input/InputText";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import {
  editLoyaltyRuleConfig,
  loyaltyRulesConfig,
} from "@/v2-architecture/src/features/loyalty/react-query";
import { loyaltyRuleSchema, LoyaltyRuleSchema } from "../validations";
import { toNumericFormatProps } from "@/utils/app/toNumericFieldProps";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import { USER_TIER_LOYALITY_LABEL } from "../constants";
import { UserTier } from "@/v2-architecture/src/entity/user";
import Button from "@/components/ui/Button/Button";
import { ArrowRightIcon } from "@/components/ui/Icon";

function EditLoyaltyRuleForm() {
  const params = useParams<{ "user-tier": string }>();
  const { back } = useRouter();
  const tierName = params["user-tier"] as UserTier;

  //#region // * ------------ Rule Data ------------
  const rulesQuery = useQuery(loyaltyRulesConfig());
  const rule = rulesQuery.data?.find((r) => r.tierName === tierName);
  //#endregion // * ------------ Rule Data ------------

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: 3.5 }}>
        <Stack direction={"row"} sx={{ alignItems: "center", gap: 4 }}>
          <Button size="small" onClick={back} variant="on-surface">
            <ArrowRightIcon />
            {"برگشت"}
          </Button>
          <PagePaperTitle>{`ویرایش سطح ${USER_TIER_LOYALITY_LABEL[tierName as UserTier]}`}</PagePaperTitle>
        </Stack>
      </PagePaperHeading>

      {rulesQuery.isLoading && (
        <FormLayoutLable>{"در حال بارگذاری..."}</FormLayoutLable>
      )}

      {!rulesQuery.isLoading && !rule && (
        <FormLayoutLable>{"قانونی برای این سطح یافت نشد"}</FormLayoutLable>
      )}

      {!!rule && <RuleForm tierName={tierName} rule={rule} />}
    </PagePaper>
  );
}

export default EditLoyaltyRuleForm;

//#region // * ------------ Internal Components ------------
type RuleFormProps = {
  tierName: UserTier;
  rule: { minVolumeKg: number; feeRate: number };
};

function RuleForm({ tierName, rule }: RuleFormProps) {
  //#region // * ------------ Form Mutation ------------
  const mutation = useMutation(editLoyaltyRuleConfig());
  //#endregion // * ------------ Form Mutation ------------

  //#region // * ------------ Form State ------------
  const form = useForm<LoyaltyRuleSchema>({
    resolver: zodResolver(loyaltyRuleSchema),
    defaultValues: {
      tierName,
      minVolumeKg: rule.minVolumeKg,
      feeRate: rule.feeRate * 100,
    },
  });
  const submitHandler = (fields: LoyaltyRuleSchema) => {
    return safeAsync(() => mutation.mutateAsync(fields));
  };
  //#endregion // * ------------ Form State ------------

  return (
    <FormControl disabled={form.formState.isSubmitting}>
      <FormLayout onSubmit={form.handleSubmit(submitHandler)}>
        <FormLayoutField>
          <FormLayoutLable>{"سطح"}</FormLayoutLable>
          <InputText disabled {...form.register("tierName")} />
        </FormLayoutField>

        <FormLayoutField>
          <FormLayoutLable>{"حداقل حجم معاملات (کیلوگرم)"}</FormLayoutLable>
          <Controller
            control={form.control}
            name="minVolumeKg"
            render={({ field, fieldState }) => (
              <InputNumeric
                placeholder="مثلاً 500000"
                error={!!fieldState.error?.message}
                {...toNumericFormatProps(field)}
              />
            )}
          />
        </FormLayoutField>

        <FormLayoutField>
          <FormLayoutLable>{"نرخ کارمزد (درصد)"}</FormLayoutLable>
          <Controller
            control={form.control}
            name="feeRate"
            render={({ field, fieldState }) => (
              <InputNumeric
                placeholder="مثلاً 1.5"
                error={!!fieldState.error?.message}
                {...toNumericFormatProps(field)}
              />
            )}
          />
        </FormLayoutField>

        <FormLayoutSubmit>{"ذخیره تغییرات"}</FormLayoutSubmit>
      </FormLayout>
    </FormControl>
  );
}
//#endregion // * ------------ Internal Components ------------
