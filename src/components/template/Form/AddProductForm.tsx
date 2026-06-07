"use client";
import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import addProductSchema from "@/validations/product/addProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputSelectProductCategory from "../Input/InputSelectProductCategories";
import { promiseAlert } from "@/packages/react-hot-toast";
import safeAsync from "@/utils/app/safeAsync";
import { addProductConfig } from "@/packages/react-query";
import { useMutation } from "@tanstack/react-query";
import { AddProductSchemaType } from "@/validations/types";
import alertMessages from "@/constant/app/alertMessages";

const mutationConfig = addProductConfig();

function AddProductForm() {
  const mutation = useMutation(mutationConfig);

  const form = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      categoryId: "",
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
          <FormLayoutLable>{"نماد"}</FormLayoutLable>
          <InputText
            placeholder="نماد محصول"
            disabled={form.formState.isSubmitting}
            error={!!form.formState.errors.name}
            {...form.register("name")}
          />
        </FormLayoutField>

        <FormLayoutField>
          <FormLayoutLable>{"دسته بندی"}</FormLayoutLable>
          <Controller
            control={form.control}
            name="categoryId"
            render={({ field }) => {
              return (
                <InputSelectProductCategory
                  placeholder="دسته بندی را انتخاب کن"
                  disabled={form.formState.isSubmitting}
                  error={!!form.formState.errors.categoryId}
                  {...field}
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
          {/* <FormLayoutLable>{"واحد اندازه گیری"}</FormLayoutLable>
          <InputSelect placeholder="واحد را انتخاب کن"></InputSelect> */}
        </FormLayoutField>
      </FormLayoutFieldGroup>

      {/* <FormLayoutCheckbox>
        <FormLayoutLable component={"p"}>{"وضعیت محصول"}</FormLayoutLable>
        <FormLayoutCheckboxGroup>
          <CheckBox label={"فعال"} />
          <CheckBox label={"قیر فعال"} />
        </FormLayoutCheckboxGroup>
      </FormLayoutCheckbox> */}

      <FormLayoutSubmit disabled={form.formState.isSubmitting}>
        {"افزودن محصول"}
      </FormLayoutSubmit>
    </FormLayout>
  );
}

export default AddProductForm;
