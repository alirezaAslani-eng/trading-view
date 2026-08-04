"use client";
import {
  useForm,
  useFieldArray,
  Controller,
  ControllerRenderProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormControl, Switch, Typography } from "@mui/material";
import safeAsync from "@/utils/app/safeAsync";
import Button from "@/components/ui/Button/Button";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import { AddIcon, DeleteIcon } from "@/components/ui/Icon";
import { botSettingConfig, configureBotConfig } from "../react-query";
import { symbolsConfig } from "@/packages/react-query";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@/constant/app/routes";
import { useEffect } from "react";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import {
  configureBotSchema,
  ConfigureBotSchemaOutput,
} from "@/validations/robot/configureBotSchema";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import { NumericFormatProps } from "react-number-format";
function ConfigRobotForm() {
  const params = useParams<{ symbol: string }>();
  const router = useRouter();
  const symbolParam = params.symbol;

  //#region // * ------------ Bot Mutation ------------
  const botConfigMutation = useMutation(configureBotConfig());
  //#endregion // * ------------ Bot Mutation ------------

  //#region // * ------------ Form State ------------
  const form = useForm({
    resolver: zodResolver(configureBotSchema),
    defaultValues: {
      symbol: symbolParam,
      isActive: false,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pressureRules",
  });
  const submitHandler = (fields: ConfigureBotSchemaOutput) => {
    return safeAsync(() => botConfigMutation.mutateAsync(fields));
  };
  //#endregion // * ------------ Form State ------------

  //#region // * ------------ Form Data ------------
  const symbolsQuery = useQuery(symbolsConfig());
  const botSettingQuery = useQuery({
    ...botSettingConfig(),
  });
  const symbols = symbolsQuery.data ?? [];
  const botSetting = (() => {
    return botSettingQuery.data?.find((item) => item.symbol === symbolParam);
  })();
  console.log(botSetting);

  const isLoading =
    symbolsQuery.isLoading ||
    botSettingQuery.isLoading ||
    botSettingQuery.isError ||
    symbolsQuery.isError;

  useEffect(() => {
    if (!botSetting) return;
    form.reset(botSetting);
  }, [botSetting]);
  //#endregion // * ------------ Form Data ------------
  return (
    <>
      {isLoading ? (
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {"در حال بارگیری ..."}
        </Typography>
      ) : (
        <FormControl disabled={form.formState.isSubmitting}>
          <FormLayout onSubmit={form.handleSubmit(submitHandler)}>
            {/* ============ basic-setting-tab ============ */}
            <FormLayoutFieldGroup>
              <FormLayoutField>
                <FormLayoutLable>{"نماد"}</FormLayoutLable>

                <InputSelect
                  placeholder="انتخاب نماد"
                  value={symbolParam}
                  onChange={(symbol) =>
                    router.push(ROUTES.ROBOT.ROBOT_CONFIG(symbol))
                  }
                >
                  <InputSelectMenu>
                    {symbols.map((symbol) => (
                      <InputSelectItem key={symbol.name} value={symbol.name}>
                        {symbol.description}
                      </InputSelectItem>
                    ))}
                  </InputSelectMenu>
                </InputSelect>
              </FormLayoutField>

              <FormLayoutField>
                <FormLayoutLable>{"وضعیت فعالیت"}</FormLayoutLable>
                <Controller
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <Switch checked={field.value} onChange={field.onChange} />
                  )}
                />
              </FormLayoutField>
            </FormLayoutFieldGroup>

            <FormLayoutField>
              <FormLayoutLable>{"قیمت پایه ادمین (تومان)"}</FormLayoutLable>

              <Controller
                control={form.control}
                name="manualBasePrice"
                render={({ field, fieldState }) => (
                  <InputNumeric
                    placeholder="مثلاً 65000"
                   {...toNumericFormatProps(field)}
                    error={!!fieldState.error}
                  />
                )}
              />
            </FormLayoutField>
            {/* ============ /basic-setting-tab ============ */}

            {/* ============ queue-setting-tab ============ */}
            <FormLayoutFieldGroup>
              <FormLayoutField>
                <FormLayoutLable>{"سقف بودجه وزنی"}</FormLayoutLable>

                <Controller
                  control={form.control}
                  name="orderWeight"
                  render={({ field, fieldState }) => (
                    <InputNumeric
                      placeholder="حداکثر آهن قابل درگیر شدن"
                      {...toNumericFormatProps(field)}
                      error={!!fieldState.error}
                    />
                  )}
                />
              </FormLayoutField>

              <FormLayoutField>
                <FormLayoutLable>
                  {"فاصله قیمتی بین پله‌ها (تومان)"}
                </FormLayoutLable>

                <Controller
                  control={form.control}
                  name="stepPriceGap"
                  render={({ field, fieldState }) => (
                    <InputNumeric
                      placeholder="مثلاً 500"
                      {...toNumericFormatProps(field)}
                      error={!!fieldState.error}
                    />
                  )}
                />
              </FormLayoutField>
            </FormLayoutFieldGroup>

            <FormLayoutFieldGroup>
              <FormLayoutField>
                <FormLayoutLable>{"تعداد پله‌های صف"}</FormLayoutLable>

                <Controller
                  control={form.control}
                  name="ladderLevels"
                  render={({ field, fieldState }) => (
                    <InputNumeric
                      placeholder="مثلاً 4"
                      {...toNumericFormatProps(field)}
                      error={!!fieldState.error}
                    />
                  )}
                />
              </FormLayoutField>

              <FormLayoutField>
                <FormLayoutLable>{"حجم هر پله (کیلوگرم)"}</FormLayoutLable>

                <Controller
                  control={form.control}
                  name="fixedStepWeight"
                  render={({ field, fieldState }) => (
                    <InputNumeric
                      placeholder="مثلاً 50000"
                      {...toNumericFormatProps(field)}
                      error={!!fieldState.error}
                    />
                  )}
                />
              </FormLayoutField>
            </FormLayoutFieldGroup>

            <FormLayoutField>
              <FormLayoutLable>{"گام رُند کردن قیمت (تومان)"}</FormLayoutLable>

              <Controller
                control={form.control}
                name="priceRoundingStep"
                render={({ field, fieldState }) => (
                  <InputNumeric
                    placeholder="مثلاً 5"
                    {...toNumericFormatProps(field)}
                    error={!!fieldState.error}
                  />
                )}
              />
            </FormLayoutField>

            <FormLayoutField>
              <FormLayoutLable>
                {"درصد اسپرد (شکاف خرید و فروش)"}
              </FormLayoutLable>
              <Controller
                control={form.control}
                name="spreadPercentage"
                render={({ field, fieldState }) => (
                  <InputNumeric
                    placeholder="مثلاً 40"
                    {...toNumericFormatProps(field)}
                    error={!!fieldState.error}
                  />
                )}
              />
            </FormLayoutField>
            {/* ============ /queue-setting-tab ============ */}

            {/* ============ ai-setting-tab ============ */}
            <FormLayoutFieldGroup>
              <FormLayoutField>
                <FormLayoutLable>
                  {"ضریب حساسیت به کمبود موجودی"}
                </FormLayoutLable>

                <Controller
                  control={form.control}
                  name="inventoryImpactFactor"
                  render={({ field, fieldState }) => (
                    <InputNumeric
                      placeholder="مثلاً 0.05"
                      {...toNumericFormatProps(field)}
                      error={!!fieldState.error}
                    />
                  )}
                />
              </FormLayoutField>

              <FormLayoutField>
                <FormLayoutLable>{"دامنه تشخیص اردرهای واقعی"}</FormLayoutLable>

                <Controller
                  control={form.control}
                  name="spoofingProtectionRange"
                  render={({ field, fieldState }) => (
                    <InputNumeric
                      placeholder="مثلاً 0.02"
                      {...toNumericFormatProps(field)}
                      error={!!fieldState.error}
                    />
                  )}
                />
              </FormLayoutField>
            </FormLayoutFieldGroup>

            <FormLayoutFieldGroup>
              <FormLayoutField>
                <FormLayoutLable>
                  {"آستانه تشخیص نهنگ (کیلوگرم)"}
                </FormLayoutLable>

                <Controller
                  control={form.control}
                  name="whaleDefenseThreshold"
                  render={({ field, fieldState }) => (
                    <InputNumeric
                      placeholder="مثلاً 5000000"
                      {...toNumericFormatProps(field)}
                      error={!!fieldState.error}
                    />
                  )}
                />
              </FormLayoutField>

              <FormLayoutField>
                <FormLayoutLable>
                  {"زمان خاموشی پس از حمله (دقیقه)"}
                </FormLayoutLable>

                <Controller
                  control={form.control}
                  name="whaleCooldownMinutes"
                  render={({ field, fieldState }) => (
                    <InputNumeric
                      placeholder="مثلاً 5"
                      {...toNumericFormatProps(field)}
                      error={!!fieldState.error}
                    />
                  )}
                />
              </FormLayoutField>
            </FormLayoutFieldGroup>

            <FormLayoutField>
              <FormLayoutLable>{"درصد مطلوب نگهداری کالا"}</FormLayoutLable>

              <Controller
                control={form.control}
                name="targetAssetRatio"
                render={({ field, fieldState }) => (
                  <InputNumeric
                    placeholder="مثلاً 0.3"
                    {...toNumericFormatProps(field)}
                    error={!!fieldState.error}
                  />
                )}
              />
            </FormLayoutField>

            {/* ============ /ai-setting-tab ============ */}

            {/* ============ presure-setting-tab ============ */}
            {fields.map((field, index) => (
              <FormLayoutFieldGroup key={field.id}>
                <FormLayoutField>
                  <FormLayoutLable>{"از فشار صف (٪)"}</FormLayoutLable>

                  <Controller
                    control={form.control}
                    name={`pressureRules.${index}.minPressurePercent`}
                    render={({ field, fieldState }) => (
                      <InputNumeric
                        placeholder="مثلاً 10"
                        {...toNumericFormatProps(field)}
                        error={!!fieldState.error}
                      />
                    )}
                  />
                </FormLayoutField>

                <FormLayoutField>
                  <FormLayoutLable>{"تا فشار صف (٪)"}</FormLayoutLable>

                  <Controller
                    control={form.control}
                    name={`pressureRules.${index}.maxPressurePercent`}
                    render={({ field, fieldState }) => (
                      <InputNumeric
                        placeholder="مثلاً 30"
                        {...toNumericFormatProps(field)}
                        error={!!fieldState.error}
                      />
                    )}
                  />
                </FormLayoutField>

                <FormLayoutField>
                  <FormLayoutLable>
                    {"مقدار عقب‌نشینی قیمت (تومان)"}
                  </FormLayoutLable>

                  <Controller
                    control={form.control}
                    name={`pressureRules.${index}.baseAdjustment`}
                    render={({ field, fieldState }) => (
                      <InputNumeric
                        placeholder="مثلاً 1000"
                        {...toNumericFormatProps(field)}
                        error={!!fieldState.error}
                      />
                    )}
                  />
                </FormLayoutField>

                <FormLayoutField>
                  <FormLayoutLable>
                    {"شتاب کش‌آمدن پله‌ها (تومان)"}
                  </FormLayoutLable>

                  <Controller
                    control={form.control}
                    name={`pressureRules.${index}.gapAcceleration`}
                    render={({ field, fieldState }) => (
                      <InputNumeric
                        placeholder="مثلاً 200"
                        {...toNumericFormatProps(field)}
                        error={!!fieldState.error}
                      />
                    )}
                  />
                </FormLayoutField>

                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => remove(index)}
                >
                  <DeleteIcon sx={{ color: "inherit" }} />
                  {"حذف قانون"}
                </Button>
              </FormLayoutFieldGroup>
            ))}

            <Button
              type="button"
              variant="on-surface"
              onClick={() =>
                append({
                  minPressurePercent: 0,
                  maxPressurePercent: 0,
                  baseAdjustment: 0,
                  gapAcceleration: 0,
                })
              }
            >
              <AddIcon />
              {"افزودن قانون"}
            </Button>
            {/* ============ /presure-setting-tab ============ */}

            <FormLayoutSubmit>{"ذخیره تنظیمات"}</FormLayoutSubmit>
          </FormLayout>
        </FormControl>
      )}
    </>
  );
}

export default ConfigRobotForm;

function toNumericFormatProps(field: ControllerRenderProps<any>) {
  const { onChange, ...rest } = field;
  return {
    ...rest,
    value: field.value,
    onValueChange: ({ floatValue }) => field.onChange(floatValue),
  } satisfies NumericFormatProps;
}
