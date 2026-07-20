"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { demoSettingConfig, setDemoConfig } from "../react-query";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { SetDemoSettingVariables } from "../api";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
import { formatFaPrice } from "@/utils";
import { WEIGHT_UNITS } from "@/constant/features/product/weightUnits";
import Button from "@/components/ui/Button/Button";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import safeAsync from "@/utils/app/safeAsync";
import { SetDemoSettingSchema, setDemoSettingSchema } from "../validations";

interface DemoSettingFormProps {
  defaultValues: SetDemoSettingSchema;
  onSuccess: () => void;
  onCancel: () => void;
}

function DemoSettingForm({
  defaultValues,
  onSuccess,
  onCancel,
}: DemoSettingFormProps) {
  const mutation = useMutation(setDemoConfig());

  const form = useForm({
    resolver: zodResolver(setDemoSettingSchema),
    defaultValues,
  });

  const onSubmit = async (values: SetDemoSettingVariables) => {
    return safeAsync(() =>
      mutation.mutateAsync(values, {
        onSuccess: () => {
          return onSuccess();
        },
      })
    );
  };

  const isDisabledForm = form.formState.isSubmitting;
  const isDisabledSubmit =
    form.formState.isSubmitting || !form.formState.isDirty;

  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
      <FormLayoutField>
        <FormLayoutLable>{"مبلغ اولیه"}</FormLayoutLable>
        <Controller
          name="initialIrtAmount"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <InputNumeric
                disabled={isDisabledForm}
                value={field.value}
                onValueChange={({ floatValue }) => {
                  field.onChange(floatValue);
                }}
                placeholder="مبلغ اولیه ریالی"
                error={!!fieldState.error}
              />
            );
          }}
        />
      </FormLayoutField>

      <FormLayoutField>
        <FormLayoutLable>{"مقدار دارایی"}</FormLayoutLable>
        <Controller
          name="initialAssetAmount"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <InputNumeric
                disabled={isDisabledForm}
                value={field.value}
                onValueChange={({ floatValue }) => {
                  field.onChange(floatValue);
                }}
                placeholder="مقدار اولیه دارایی"
                error={!!fieldState.error}
              />
            );
          }}
        />
      </FormLayoutField>

      <FormLayoutField>
        <FormLayoutLable>{"اعتبار"}</FormLayoutLable>
        <Controller
          name="validityDays"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <InputNumeric
                disabled={isDisabledForm}
                value={field.value}
                onValueChange={({ floatValue }) => {
                  field.onChange(floatValue);
                }}
                placeholder="مدت اعتبار (روز)"
                error={!!fieldState.error}
              />
            );
          }}
        />
      </FormLayoutField>

      <Stack sx={{ flexDirection: "row", gap: "8px", alignItems: "center" }}>
        <FormLayoutSubmit variant="contained" disabled={isDisabledSubmit}>
          ذخیره
        </FormLayoutSubmit>
        <FormLayoutSubmit
          type="button"
          variant="outlined"
          onClick={onCancel}
          disabled={isDisabledForm}
        >
          انصراف
        </FormLayoutSubmit>
      </Stack>
    </FormLayout>
  );
}

interface DemoSettingViewProps {
  data: SetDemoSettingVariables;
  onEdit: () => void;
}

function DemoSettingView({ data, onEdit }: DemoSettingViewProps) {
  return (
    <Stack spacing={2} sx={{ color: "text.onPrimary" }}>
      <Box>
        <Typography variant="body2" sx={{ color: "inherit" }}>
          مبلغ اولیه {PRICE_UNITS.IRT.displayName}
        </Typography>
        <Typography variant="body1">
          {formatFaPrice(data.initialIrtAmount)}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "text.disabled" }} />
      <Box>
        <Typography variant="body2" sx={{ color: "inherit" }}>
          مقدار اولیه دارایی
        </Typography>
        <Typography variant="body1">
          {`${formatFaPrice(data.initialAssetAmount)} ${WEIGHT_UNITS.KG.lable}`}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "text.disabled" }} />
      <Box>
        <Typography variant="body2" sx={{ color: "inherit" }}>
          مدت اعتبار (روز)
        </Typography>
        <Typography variant="body1">{data.validityDays}</Typography>
      </Box>

      <Button
        variant="contained"
        onClick={onEdit}
        sx={{ alignSelf: "flex-start" }}
      >
        ویرایش
      </Button>
    </Stack>
  );
}

export default function DemoSetting() {
  const query = useQuery(demoSettingConfig());

  const [view, setView] = useState(false);

  if (query.isLoading || query.isError) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!query.data) {
    return null;
  }

  if (view) {
    return (
      <DemoSettingForm
        defaultValues={query.data}
        onSuccess={() => {
          setView(false);
        }}
        onCancel={() => {
          setView(false);
        }}
      />
    );
  }

  return (
    <DemoSettingView
      data={query.data}
      onEdit={() => {
        setView(true);
      }}
    />
  );
}
