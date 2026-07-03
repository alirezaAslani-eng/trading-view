"use client";
import InputText from "@/components/ui/Input/InputText";
import { kycLevel2Config } from "@/packages/react-query";
import kycL2Schema from "@/validations/kyc/kycL2Schema";
import { KycL2SchemaType } from "@/validations/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import safeAsync from "@/utils/app/safeAsync";
import { useDispatch } from "@/packages/redux";
import { exitKycFlow } from "@/redux/features/kyc";
import {
  FormLayout,
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
import { kycContent } from "@/content/kyc";

function KycL2Form() {
  const dispatch = useDispatch();

  const closeKycModal = () => dispatch(exitKycFlow());

  const mutation = useMutation(
    kycLevel2Config({
      onSuccess: closeKycModal,
    }),
  );

  const form = useForm({ resolver: zodResolver(kycL2Schema) });

  const submitHandler: SubmitHandler<KycL2SchemaType> = async (fields) => {
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

export default KycL2Form;
