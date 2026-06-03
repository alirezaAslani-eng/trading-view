"use client";
import safeAsync from "@/utils/app/safeAsync";
import addShabaSchema from "@/validations/bank/addShabaSchema";
import { AddShabaSchemaType } from "@/validations/types";
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
import { addShabaConfig } from "@/packages/react-query";

interface AddShabaFormProps extends Pick<
  MutationOptions<string, ResponseErrorType, AddShabaSchemaType>,
  "onSuccess" | "mutationFn"
> {}

const addshabaconfig = addShabaConfig();

function AddShabaForm(mutationProps: AddShabaFormProps) {
  const addShabaMutation = useMutation(addshabaconfig);

  const onSubmit: SubmitHandler<AddShabaSchemaType> = async (fields) => {
    await safeAsync(async () => {
      await addShabaMutation.mutateAsync(fields);
    });
  };

  const form = useForm({
    resolver: zodResolver(addShabaSchema),
    defaultValues:{
      birthDateShamsi:"1384/08/02",
      Iban:"",
    }
  });

  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
      <FormLayoutAlert>
        {"شماره شبا باید متعلق به صاحب کد ملی باشد"}
      </FormLayoutAlert>
      
      {/* // * ----------- IBAN ----------- */}
      <FormLayoutField>
        <FormLayoutLable>{"شماره شبا"}</FormLayoutLable>
        <InputText
          placeholder="24 رقم شماره شبا را وارد کنید (بدون IR)"
          error={!!form.formState.errors?.Iban?.message}
          {...form.register("Iban")}
        />
      </FormLayoutField>
  
      <FormLayoutSubmit disabled={form.formState.isSubmitting}>
        {"ثبت شماره شبا"}
      </FormLayoutSubmit>
    </FormLayout>
  );
}

export default AddShabaForm;
