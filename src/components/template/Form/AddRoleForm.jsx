import Accordion from "@/components/ui/Accordion/Accordion";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import { BoxOutlinedIcon } from "@/components/ui/Icon";
import InputText from "@/components/ui/Input/InputText";
import ScrollContainer from "@/components/ui/ScrollContainer/ScrollContainer";
import { AccordionDetails, AccordionSummary, Box, Stack } from "@mui/material";
import React from "react";
import {
  AccordionCheckboxItem,
  AccordionCheckboxLabel,
} from "@/components/ui/AccordionItem/AccordionCheckboxItem";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

const accordion_container_sx = {
  backgroundColor: "background.surfaceTertiary",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "16px",
  p: "20px 16px",
};

function AddRoleForm() {
  return (
    <FormLayout>
      <FormLayoutFieldGroup>
        <FormLayoutField>
          <FormLayoutLable>{"نام نقش"}</FormLayoutLable>
          <InputText placeholder="عنوان نقش جدید را وارد کنید" />
        </FormLayoutField>
        <FormLayoutField></FormLayoutField>
      </FormLayoutFieldGroup>

      <FormLayoutField>
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
                  {/* // * ------ Active All Checkbox ------  */}
                  <AccordionCheckboxItem sx={{ borderColor: "border.default" }}>
                    <AccordionCheckboxLabel sx={{ color: "text.secondary" }}>
                      {"همه"}
                    </AccordionCheckboxLabel>
                    <CheckBox size="small" />
                  </AccordionCheckboxItem>
                  {/* // * ------ Active Each Checkbox ------  */}
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
      </FormLayoutField>

      <FormLayoutSubmit>{"ثبت اطلاعات"}</FormLayoutSubmit>
    </FormLayout>
  );
}

export default AddRoleForm;
