import { InputSelect } from "@/components/ui/Input/InputSelect";
import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutAlert,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function KycL1Form() {
  return (
    <FormLayout>
      <FormLayoutAlert>
        {"شماره شبا باید متعلق به صاحب کد ملی 2940282714 باشد"}
      </FormLayoutAlert>
      <FormLayoutFieldGroup>
        <FormLayoutField>
          <FormLayoutLable>{"کد ملی"}</FormLayoutLable>
          <InputText placeholder="کد ملی را وارد کنید" />
        </FormLayoutField>
        <FormLayoutField>
          <FormLayoutLable>{"شماره موبایل"}</FormLayoutLable>
          <InputText placeholder="شماره موبایل خود را وارد کنید" />
        </FormLayoutField>
      </FormLayoutFieldGroup>

      <FormLayoutField>
        <FormLayoutLable>{"تاریخ تولد"}</FormLayoutLable>
        <FormLayoutFieldGroup>
          <FormLayoutField>
            <InputSelect placeholder="سال"></InputSelect>
          </FormLayoutField>
          <FormLayoutField>
            <InputSelect placeholder="ماه"></InputSelect>
          </FormLayoutField>
          <FormLayoutField>
            <InputSelect placeholder="روز"></InputSelect>
          </FormLayoutField>
        </FormLayoutFieldGroup>
      </FormLayoutField>

      <FormLayoutSubmit color="error">{"ثبت اطلاعات"}</FormLayoutSubmit>
    </FormLayout>
  );
}

export default KycL1Form;
