"use client";
import InputText from "@/components/ui/Input/InputText";
import addProductSchema from "@/validations/product/addProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputSelectProductCategory from "../Input/InputSelectProductCategories";
import { promiseAlert } from "@/packages/react-hot-toast";
import safeAsync from "@/utils/app/safeAsync";
import { addProductConfig } from "@/packages/react-query";
import { useMutation } from "@tanstack/react-query";
import { AddProductSchemaType } from "@/validations/types";
import { ComponentProps } from "react";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import alertMessages from "@/constant/app/alertMessages";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  FormLayout,
  FormLayoutCheckbox,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
  FormLayoutCheckboxGroup,
} from "@/components/ui/Layout/FormLayout";

const mutationConfig = addProductConfig();

function AddProductForm() {
  const mutation = useMutation(mutationConfig);

  const form = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      categoryId: "",
      unitOfMeasure: "",
      productStatusId: false,
    },
  });

  const onSubmitHandler: SubmitHandler<AddProductSchemaType> = async (
    fields,
  ) => {
    await promiseAlert(
      safeAsync(async () => {
        await mutation.mutateAsync(fields);
      }),
      { loading: alertMessages.loading },
    );
  };

  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmitHandler)}>
      <FormLayoutFieldGroup>
        <FormLayoutField>
          <FormLayoutLable>{"نام محصول"}</FormLayoutLable>
          <InputText
            placeholder="نام محصول را وارد کنید"
            disabled={form.formState.isSubmitting}
            error={!!form.formState.errors.productName}
            {...form.register("productName")}
          />
        </FormLayoutField>

        <FormLayoutField>
          <FormLayoutLable>{"دسته بندی"}</FormLayoutLable>
          <Controller
            control={form.control}
            name="categoryId"
            render={({ field, formState }) => {
              return (
                <InputSelectProductCategory
                  placeholder="دسته بندی را انتخاب کن"
                  disabled={formState.isSubmitting}
                  error={!!form.formState.errors.categoryId}
                  onChange={field.onChange}
                  value={field.value}
                />
              );
            }}
          />
        </FormLayoutField>
      </FormLayoutFieldGroup>

      <FormLayoutFieldGroup>
        <FormLayoutField>
          <FormLayoutLable>{"کد محصول"}</FormLayoutLable>
          <InputText
            placeholder="کد را وارد کنید"
            disabled={form.formState.isSubmitting}
            error={!!form.formState.errors.productCode}
            {...form.register("productCode")}
          />
        </FormLayoutField>

        <FormLayoutField>
          <FormLayoutLable>{"واحد اندازه گیری"}</FormLayoutLable>
          <Controller
            control={form.control}
            name="unitOfMeasure"
            render={({ field, formState, fieldState }) => {
              return (
                <InputSelectProductUnit
                  onChange={field.onChange}
                  value={field.value}
                  disabled={formState.isSubmitting}
                  error={!!fieldState.error?.message}
                />
              );
            }}
          />
        </FormLayoutField>
      </FormLayoutFieldGroup>

      <FormLayoutFieldGroup>
        <FormLayoutField>
          <FormLayoutLable>{"حداکثر حجم معاملات"}</FormLayoutLable>
          <Controller
            control={form.control}
            name="maxTradingSupply"
            render={({ field, fieldState, formState }) => {
              return (
                <InputNumeric
                  placeholder="حد اکثر حجم را وارد کنید"
                  disabled={formState.isSubmitting}
                  error={!!fieldState.error?.message}
                  value={field.value}
                  onValueChange={({ floatValue }) => {
                    field.onChange(floatValue);
                  }}
                />
              );
            }}
          />
        </FormLayoutField>

        <FormLayoutField>
          <FormLayoutLable>{"قیمت اولیه"}</FormLayoutLable>
          <Controller
            control={form.control}
            name="initialPrice"
            render={({ field, fieldState, formState }) => {
              return (
                <InputNumeric
                  placeholder="قیمت را واردکنید (تومان)"
                  disabled={formState.isSubmitting}
                  error={!!fieldState.error?.message}
                  value={field.value}
                  onValueChange={({ floatValue }) => {
                    field.onChange(floatValue);
                  }}
                />
              );
            }}
          />
        </FormLayoutField>
      </FormLayoutFieldGroup>

      <FormLayoutCheckbox>
        <FormLayoutLable component={"p"}>{"وضعیت محصول"}</FormLayoutLable>
        <FormLayoutCheckboxGroup>
          <CheckBox label={"فعال"} {...form.register("productStatusId")} />
        </FormLayoutCheckboxGroup>
      </FormLayoutCheckbox>

      <FormLayoutSubmit disabled={form.formState.isSubmitting}>
        {"افزودن محصول"}
      </FormLayoutSubmit>
    </FormLayout>
  );
}

export default AddProductForm;

function InputSelectProductUnit(props: ComponentProps<typeof InputSelect>) {
  return (
    <InputSelect placeholder="واحد را انتخاب کن" {...props}>
      <InputSelectMenu>
        <InputSelectItem value={"kg"}>{"kg"}</InputSelectItem>
      </InputSelectMenu>
    </InputSelect>
  );
}
