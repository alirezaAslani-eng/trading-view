// --- TradeRobotFormFields.tsx ---
"use client";
import { useFieldArray, Controller, UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { FormControlLabel, Switch } from "@mui/material";
import Button from "@/components/ui/Button/Button";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import { AddIcon, DeleteIcon } from "@/components/ui/Icon";
import { symbolsConfig } from "@/packages/react-query";
import {
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
} from "@/components/ui/Layout/FormLayout";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  ConfigureBotSchemaInput,
  ConfigureBotSchemaOutput,
} from "@/validations/robot/configureBotSchema";
import { toNumericFormatProps } from "@/utils/app/toNumericFieldProps";
import { toCheckboxFieldProps } from "@/utils/app/toCheckboxFieldProps";

type TradeRobotFormFieldsProps = {
  form: UseFormReturn<
    ConfigureBotSchemaInput,
    unknown,
    ConfigureBotSchemaOutput
  >;
};

export default function TradeRobotFormFields({
  form,
}: TradeRobotFormFieldsProps) {
  //#region // * ------------ Symbols Data ------------
  const symbolsQuery = useQuery(symbolsConfig());
  const symbols = symbolsQuery.data ?? [];
  //#endregion // * ------------ Symbols Data ------------

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pressureRules",
  });

  return (
    <>
      {/* ============ basic-setting-tab ============ */}
      <FormLayoutFieldGroup>
        <FormLayoutField>
          <FormLayoutLable>{"نماد"}</FormLayoutLable>

          <Controller
            control={form.control}
            name="symbol"
            render={({ field, fieldState }) => (
              <InputSelect
                placeholder="انتخاب نماد"
                error={!!fieldState.error}
                value={field.value}
                onChange={field.onChange}
              >
                <InputSelectMenu>
                  {symbols.map((symbol) => (
                    <InputSelectItem key={symbol.name} value={symbol.name}>
                      {symbol.description}
                    </InputSelectItem>
                  ))}
                </InputSelectMenu>
              </InputSelect>
            )}
          />
        </FormLayoutField>

        <FormLayoutField>
          <Controller
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormControlLabel
                label="وضعیت فعالیت"
                control={<Switch {...toCheckboxFieldProps(field)} />}
              />
            )}
          />
        </FormLayoutField>

        <FormLayoutField>
          <Controller
            control={form.control}
            name="settlementMode"
            render={({ field }) => (
              <FormControlLabel
                label={field.value ? "معامله ۱۰ درصد" : "معامله عادی"}
                control={<Switch {...toCheckboxFieldProps(field)} />}
              />
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
          <FormLayoutLable>{"فاصله قیمتی بین پله‌ها (تومان)"}</FormLayoutLable>

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
        <FormLayoutLable>{"درصد اسپرد (شکاف خرید و فروش)"}</FormLayoutLable>
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
          <FormLayoutLable>{"ضریب حساسیت به کمبود موجودی"}</FormLayoutLable>

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
          <FormLayoutLable>{"آستانه تشخیص نهنگ (کیلوگرم)"}</FormLayoutLable>

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
          <FormLayoutLable>{"زمان خاموشی پس از حمله (دقیقه)"}</FormLayoutLable>

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
            <FormLayoutLable>{"مقدار عقب‌نشینی قیمت (تومان)"}</FormLayoutLable>

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
            <FormLayoutLable>{"شتاب کش‌آمدن پله‌ها (تومان)"}</FormLayoutLable>

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
    </>
  );
}
