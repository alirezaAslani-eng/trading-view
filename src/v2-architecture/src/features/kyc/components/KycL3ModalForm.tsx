import { ModalFormProps } from "@/components/template/Form/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { kycL3Schema, KycL3SchemaOutput } from "../validations";
import InputFile from "@/components/ui/Input/InputFile";
import { FormControl } from "@mui/material";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import {
  FormLayout,
  FormLayoutAlert,
  FormLayoutField,
  FormLayoutFieldError,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import { useMutation } from "@tanstack/react-query";
import { kycL3Config } from "../react-query";
import safeAsync from "@/utils/app/safeAsync";

function KycL3ModalForm({ onClose }: ModalFormProps) {
  const form = useForm({ resolver: zodResolver(kycL3Schema) });
  const mutation = useMutation(kycL3Config());
  const vedoFieldError = form.formState.errors.video?.message;

  const submitHandler = async (fields: KycL3SchemaOutput) => {
    await safeAsync(() => mutation.mutateAsync(fields));
  };

  return (
    <FormControl disabled={form.formState.isSubmitting}>
      <ModalLayout onSubmit={form.handleSubmit(submitHandler)}>
        <ModalLayoutHeading>
          <ModalLayoutTitle
            title="احراز سطح 3"
            subtitle="برای احراز سطح 3 اطلاعات فرم را تکمیل کنید"
          />
          <ModalLayoutCloseIcon onClick={onClose} />
        </ModalLayoutHeading>
        <ModalLayoutBody>
          <FormLayout>
            <FormLayoutAlert>{"قوانین احراز"}</FormLayoutAlert>
            <FormLayoutField>
              <FormLayoutLable>{"لطفا اطلاعات فرم را پر کنید"}</FormLayoutLable>
              <InputFile
                {...form.register("video")}
                error={!!vedoFieldError}
                accept="video/*"
              />
              <FormLayoutFieldError
                isError={!!vedoFieldError}
                message={vedoFieldError}
              />
            </FormLayoutField>
            <FormLayoutSubmit>{"ثبت اطلاعات"}</FormLayoutSubmit>
          </FormLayout>
        </ModalLayoutBody>
      </ModalLayout>
    </FormControl>
  );
}

export default KycL3ModalForm;
