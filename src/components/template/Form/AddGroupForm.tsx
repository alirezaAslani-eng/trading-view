"use client";
import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import addGroupSchema from "@/validations/group/addGroupSchema";
import { useMutation } from "@tanstack/react-query";
import { addGroupConfig } from "@/packages/react-query";
import { AddGroupSchemaType } from "@/validations/types";
import { promiseAlert } from "@/packages/react-hot-toast";
import safeAsync from "@/utils/app/safeAsync";
import alertMessages from "@/constant/app/alertMessages";

// const accordion_container_sx = {
//   backgroundColor: "background.surfaceTertiary",
//   border: "1px solid",
//   borderColor: "border.default",
//   borderRadius: "16px",
//   p: "20px 16px",
// };

const mutationConfig = addGroupConfig();
function AddRoleForm() {
  const mutation = useMutation(mutationConfig);
  const form = useForm({ resolver: zodResolver(addGroupSchema) });

  const onSubmit: SubmitHandler<AddGroupSchemaType> = async (fields) => {
    await promiseAlert(
      safeAsync(async () => {
        await mutation.mutateAsync(fields);
      }),
      { loading: alertMessages.loading },
    );
  };

  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmit)}>
      <FormLayoutFieldGroup>
        <FormLayoutField>
          <FormLayoutLable>{"نام نقش"}</FormLayoutLable>
          <InputText
            placeholder="عنوان نقش جدید را وارد کنید"
            {...form.register("name")}
          />
        </FormLayoutField>
      </FormLayoutFieldGroup>

      {/* <FormLayoutField>
        <FormLayoutLable>{"دسترسی‌ها"}</FormLayoutLable>
        <Box sx={accordion_container_sx}>
          <ScrollContainer
            sx={{ maxHeight: "436px" }}
            overflowedSx={{ pl: "24px" }}
          >
            <Stack sx={{ gap: "10px" }}>
              <Accordion size="medium">
                <AccordionSummary>
                  <BoxOutlinedIcon />
                  {"محصولات"}
                </AccordionSummary>

                <AccordionDetails sx={{ px: "20px" }}>
                  <AccordionCheckboxItem sx={{ borderColor: "border.default" }}>
                    <AccordionCheckboxLabel sx={{ color: "text.secondary" }}>
                      {"همه"}
                    </AccordionCheckboxLabel>
                    <CheckBox size="small" />
                  </AccordionCheckboxItem>
                  <Stack sx={{ gap: "10px", mt: "10px" }}>
                    <AccordionCheckboxItem
                      sx={{ p: "0px 12px", border: "none" }}
                    >
                      <AccordionCheckboxLabel variant="body3">
                        {"مشاهده محصولات"}
                      </AccordionCheckboxLabel>
                      <CheckBox size="small" />
                    </AccordionCheckboxItem>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </ScrollContainer>
        </Box>
      </FormLayoutField> */}

      <FormLayoutSubmit>{"ثبت اطلاعات"}</FormLayoutSubmit>
    </FormLayout>
  );
}

export default AddRoleForm;
