"use client";
import safeAsync from "@/utils/app/safeAsync";
import addCardSchema from "@/validations/bank/addCardSchema";
import { AddCardSchemaType } from "@/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { addCardConfig } from "@/packages/react-query";

interface AddCreditCardFormProps extends Pick<
  MutationOptions<string, ResponseErrorType, AddCardSchemaType>,
  "onSuccess" | "mutationFn"
> {}

const addcardconfig = addCardConfig();

function AddCreditCardForm(mutationProps: AddCreditCardFormProps) {
  const addCardMutation = useMutation(addcardconfig);

  const onSubmit: SubmitHandler<AddCardSchemaType> = async (fields) => {
    await safeAsync(async () => {
      await addCardMutation.mutateAsync(fields);
    });
  };

  const form = useForm({
    resolver: zodResolver(addCardSchema),
    defaultValues:{
      birthDateShamsi:"1384/08/02",
      cardNumber:"",
    }
  });

  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
      <FormLayoutAlert>
        {"کارت باید متعلق به صاحب کد ملی باشد"}
      </FormLayoutAlert>
      
      {/* // * ----------- Card Number ----------- */}
      <FormLayoutField>
        <FormLayoutLable>{"شماره کارت"}</FormLayoutLable>
        <InputText
          placeholder="شماره کارت خود را وارد کنید"
          error={!!form.formState.errors?.cardNumber?.message}
          {...form.register("cardNumber")}
        />
      </FormLayoutField>
  
      <FormLayoutSubmit disabled={form.formState.isSubmitting}>
        {"ثبت کارت"}
      </FormLayoutSubmit>
    </FormLayout>
  );
}

export default AddCreditCardForm;
