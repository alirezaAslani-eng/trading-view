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
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import InputNumeric from "@/components/ui/Input/InputNumeric";
import alertMessages from "@/constant/app/alertMessages";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
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
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import { WEIGHT_UNIT_LIST } from "@/constant/features/product/weightUnits";
import { ModalFormProps } from "./types";
import { productContent } from "@/content/product";

function AddProductModalForm({ onClose }: ModalFormProps) {
  const mutation = useMutation(addProductConfig({ onSuccess: onClose }));

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
      safeAsync(() => mutation.mutateAsync(fields)),
      { loading: alertMessages.loading },
    );
  };

  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title={productContent.addProductFormTitle}
          subtitle={productContent.addProductFormSubTitle}
        />
        <ModalLayoutCloseIcon onClick={onClose} />
      </ModalLayoutHeading>
      <ModalLayoutBody>
        <FormLayout onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FormLayoutFieldGroup>
            <FormLayoutField>
              <FormLayoutLable>
                {productContent.productNameLabel}
              </FormLayoutLable>
              <InputText
                placeholder={productContent.productNamePlaceholder}
                disabled={form.formState.isSubmitting}
                error={!!form.formState.errors.productName}
                {...form.register("productName")}
              />
            </FormLayoutField>

            <FormLayoutField>
              <FormLayoutLable>
                {productContent.productCategoryLabel}
              </FormLayoutLable>
              <Controller
                control={form.control}
                name="categoryId"
                render={({ field, formState }) => {
                  return (
                    <InputSelectProductCategory
                      placeholder={productContent.productCategoryPlaceholder}
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
              <FormLayoutLable>
                {productContent.productCodeLabel}
              </FormLayoutLable>
              <InputText
                placeholder={productContent.productCodePlaceholder}
                disabled={form.formState.isSubmitting}
                error={!!form.formState.errors.productCode}
                {...form.register("productCode")}
              />
            </FormLayoutField>

            <FormLayoutField>
              <FormLayoutLable>
                {productContent.productUnitOfMeasureLabel}
              </FormLayoutLable>
              <Controller
                control={form.control}
                name="unitOfMeasure"
                render={({ field, formState, fieldState }) => {
                  return (
                    <InputSelect
                      placeholder={
                        productContent.productUnitOfMeasurePlaceholder
                      }
                      onChange={field.onChange}
                      value={field.value}
                      disabled={formState.isSubmitting}
                      error={!!fieldState.error?.message}
                    >
                      <InputSelectMenu>
                        {WEIGHT_UNIT_LIST.map((unitItem) => {
                          return (
                            <InputSelectItem value={unitItem.unit}>
                              {unitItem.lable}
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

          <FormLayoutFieldGroup>
            <FormLayoutField>
              <FormLayoutLable>
                {productContent.productMaxTradingSupplyLabel}
              </FormLayoutLable>
              <Controller
                control={form.control}
                name="maxTradingSupply"
                render={({ field, fieldState, formState }) => {
                  return (
                    <InputNumeric
                      placeholder={
                        productContent.productMaxTradingSupplyPlaceholder
                      }
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
              <FormLayoutLable>
                {productContent.productInitialPriceLabel}
              </FormLayoutLable>
              <Controller
                control={form.control}
                name="initialPrice"
                render={({ field, fieldState, formState }) => {
                  return (
                    <InputNumeric
                      placeholder={`${productContent.productInitialPricePlaceholder} (${PRICE_UNITS.IRT.displayName})`}
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
            <FormLayoutLable component={"p"}>
              {productContent.productStatusLabel}
            </FormLayoutLable>
            <FormLayoutCheckboxGroup>
              <CheckBox
                label={productContent.productStatusActiveLabel}
                {...form.register("productStatusId")}
              />
            </FormLayoutCheckboxGroup>
          </FormLayoutCheckbox>

          <FormLayoutSubmit disabled={form.formState.isSubmitting}>
            {productContent.addProductSubmitButton}
          </FormLayoutSubmit>
        </FormLayout>
      </ModalLayoutBody>
    </ModalLayout>
  );
}

export default AddProductModalForm;
