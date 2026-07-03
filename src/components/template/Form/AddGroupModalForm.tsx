"use client";
import InputText from "@/components/ui/Input/InputText";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import addGroupSchema from "@/validations/group/addGroupSchema";
import { useMutation } from "@tanstack/react-query";
import { addGroupConfig } from "@/packages/react-query";
import { AddGroupSchemaType } from "@/validations/types";
import { promiseAlert } from "@/packages/react-hot-toast";
import safeAsync from "@/utils/app/safeAsync";
import alertMessages from "@/constant/app/alertMessages";
import { ModalFormProps } from "./types";
import { groupContent } from "@/content/group";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldGroup,
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

function AddGroupModalForm({ onClose }: ModalFormProps) {
  const mutation = useMutation(addGroupConfig({ onSuccess: onClose }));
  const form = useForm({ resolver: zodResolver(addGroupSchema) });

  const onSubmit: SubmitHandler<AddGroupSchemaType> = async (fields) => {
    await promiseAlert(
      safeAsync(() => mutation.mutateAsync(fields)),
      { loading: alertMessages.loading },
    );
  };

  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title={groupContent.addGroupFormTitle}
          subtitle={groupContent.addGroupFormSubTitle}
        />
        <ModalLayoutCloseIcon onClick={onClose} />
      </ModalLayoutHeading>
      <ModalLayoutBody>
        <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
          <FormLayoutFieldGroup>
            <FormLayoutField>
              <FormLayoutLable>{groupContent.groupNameLabel}</FormLayoutLable>
              <InputText
                placeholder={groupContent.groupNamePlaceholder}
                {...form.register("name")}
              />
            </FormLayoutField>
          </FormLayoutFieldGroup>

          <FormLayoutSubmit>
            {groupContent.addGroupSubmitButton}
          </FormLayoutSubmit>
        </FormLayout>
      </ModalLayoutBody>
    </ModalLayout>
  );
}

export default AddGroupModalForm;
