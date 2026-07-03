"use client";
import safeAsync from "@/utils/app/safeAsync";
import addShabaSchema from "@/validations/bank/addShabaSchema";
import { AddShabaSchemaType } from "@/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import InputText from "@/components/ui/Input/InputText";
import { addShabaConfig } from "@/packages/react-query";
import { promiseAlert } from "@/packages/react-hot-toast";
import alertMessages from "@/constant/app/alertMessages";
import {
  FormLayout,
  FormLayoutAlert,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import { ModalFormProps } from "./types";

function AddShabaModalForm({ onClose }: ModalFormProps) {
  const addShabaMutation = useMutation(addShabaConfig({ onSuccess: onClose }));

  const onSubmit: SubmitHandler<AddShabaSchemaType> = async (fields) => {
    await promiseAlert(
      safeAsync(async () => {
        await addShabaMutation.mutateAsync(fields);
      }),
      { loading: alertMessages.loading },
    );
  };

  const form = useForm({
    resolver: zodResolver(addShabaSchema),
    defaultValues: {
      // ! birthdate must come from server
      birthDateShamsi: "1384/08/02",
    },
  });

  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle title="افزودن شبا" subtitle="" />
        <ModalLayoutCloseIcon onClick={onClose} />
      </ModalLayoutHeading>
      <ModalLayoutBody>
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
              disabled={form.formState.isSubmitting}
              {...form.register("Iban")}
            />
          </FormLayoutField>

          <FormLayoutSubmit disabled={form.formState.isSubmitting}>
            {"ثبت شماره شبا"}
          </FormLayoutSubmit>
        </FormLayout>
      </ModalLayoutBody>
    </ModalLayout>
  );
}

export default AddShabaModalForm;
