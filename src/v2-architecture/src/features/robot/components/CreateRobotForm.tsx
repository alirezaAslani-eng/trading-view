// --- CreateRobotForm.tsx ---
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormControl } from "@mui/material";
import safeAsync from "@/utils/app/safeAsync";
import { createTradeRobotConfig } from "../react-query";
import TradeRobotFormFields from "./TradeRobotFormFields";
import {
  FormLayout,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import {
  configureBotSchema,
  ConfigureBotSchemaOutput,
} from "@/validations/robot/configureBotSchema";

function CreateRobotForm() {
  //#region // * ------------ Bot Mutation ------------
  const createRobotMutation = useMutation(createTradeRobotConfig());
  //#endregion

  //#region // * ------------ Form State ------------
  const form = useForm({
    resolver: zodResolver(configureBotSchema),
    defaultValues: {
      isActive: false,
      settlementMode: false,
      symbol: "",
    },
  });

  const submitHandler = (fields: ConfigureBotSchemaOutput) => {
    return safeAsync(() => createRobotMutation.mutateAsync(fields));
  };
  //#endregion

  return (
    <FormControl disabled={form.formState.isSubmitting}>
      <FormLayout onSubmit={form.handleSubmit(submitHandler)}>
        <TradeRobotFormFields form={form} />
        <FormLayoutSubmit>{"ایجاد ربات"}</FormLayoutSubmit>
      </FormLayout>
    </FormControl>
  );
}

export default CreateRobotForm;
