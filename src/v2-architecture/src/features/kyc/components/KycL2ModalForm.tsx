"use client";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "@/v2-architecture/src/store";
import { exitKycFlow } from "../redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { safeAsync } from "@/v2-architecture/src/shared/utils";
import { kycContent } from "@/content/kyc";
import { zodResolver } from "@hookform/resolvers/zod";
import { kycLevel2Config } from "../react-query";
import { type KycL2Schema, kycL2Schema } from "../validations";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
  InputText,
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/v2-architecture/src/shared/ui";

export default function KycL2ModalForm() {
  const dispatch = useDispatch();

  const closeKycModal = () => dispatch(exitKycFlow());

  const mutation = useMutation(
    kycLevel2Config({
      onSuccess: closeKycModal,
    }),
  );

  const form = useForm({ resolver: zodResolver(kycL2Schema) });

  const submitHandler: SubmitHandler<KycL2Schema> = async (fields) => {
    await safeAsync(async () => {
      await mutation.mutateAsync(fields);
    });
  };

  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title={kycContent.kycL2FormTitle}
          subtitle={kycContent.kycL2FormSubTitle}
        />
        <ModalLayoutCloseIcon onClick={closeKycModal} />
      </ModalLayoutHeading>
      <ModalLayoutBody>
        <FormLayout onSubmit={form.handleSubmit(submitHandler)}>
          <FormLayoutField>
            <FormLayoutLable>{kycContent.kycL2PostalCodeLabel}</FormLayoutLable>
            <InputText
              placeholder={kycContent.kycL2PostalCodePlaceholder}
              error={!!form.formState.errors?.postalCode}
              {...form.register("postalCode")}
            />
          </FormLayoutField>

          <FormLayoutSubmit disabled={form.formState.isSubmitting}>
            {kycContent.upgradeKycSubmitButton}
          </FormLayoutSubmit>
        </FormLayout>
      </ModalLayoutBody>
    </ModalLayout>
  );
}
