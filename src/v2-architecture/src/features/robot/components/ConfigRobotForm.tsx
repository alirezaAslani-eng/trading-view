// --- ConfigRobotForm.tsx ---
"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormControl, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import safeAsync from "@/utils/app/safeAsync";
import { botSettingConfig, configureBotConfig } from "../react-query";
import TradeRobotFormFields from "./TradeRobotFormFields";
import {
  FormLayout,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import {
  configureBotSchema,
  ConfigureBotSchemaInput,
  ConfigureBotSchemaOutput,
} from "@/validations/robot/configureBotSchema";
import { useEffect } from "react";

function ConfigRobotForm() {
  const params = useParams<{ botId: string }>();
  const botId = params.botId;

  //#region // * ------------ Bot Info ------------
  const botSettingQuery = useQuery(botSettingConfig(botId));
  //#endregion // * ------------ Bot Info ------------

  return (
    <>
      {botSettingQuery.isPending && (
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {"در حال بارگیری ..."}
        </Typography>
      )}

      {botSettingQuery.isError && (
        <Typography variant="body1" sx={{ color: "status.loss" }}>
          {"دریافت اطلاعات ربات با خطا مواجه شد"}
        </Typography>
      )}

      {!botSettingQuery.isPending && botSettingQuery.isSuccess && (
        <RobotForm defaultValues={botSettingQuery.data} botId={botId} />
      )}
    </>
  );
}

export default ConfigRobotForm;

//#region // * ------------ Internal Components ------------
type RobotFormProps = {
  defaultValues: ConfigureBotSchemaInput;
  botId: string;
};

function RobotForm({ defaultValues, botId }: RobotFormProps) {
  //#region // * ------------ Bot Mutation ------------
  const botConfigMutation = useMutation(configureBotConfig());
  //#endregion // * ------------ Bot Mutation ------------

  //#region // * ------------ Form State ------------
  const form = useForm({
    resolver: zodResolver(configureBotSchema),
  });

  useEffect(() => {
    form.reset(defaultValues);
    console.log(defaultValues);
  }, [defaultValues]);

  const submitHandler = (fields: ConfigureBotSchemaOutput) => {
    return safeAsync(() => botConfigMutation.mutateAsync({ ...fields, botId }));
  };
  //#endregion // * ------------ Form State ------------

  return (
    <FormControl disabled={form.formState.isSubmitting}>
      <FormLayout onSubmit={form.handleSubmit(submitHandler)}>
        <TradeRobotFormFields form={form} />
        <FormLayoutSubmit>{"ذخیره تنظیمات"}</FormLayoutSubmit>
      </FormLayout>
    </FormControl>
  );
}
//#endregion // * ------------ Internal Components ------------
