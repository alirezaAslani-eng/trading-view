import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutAlert,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function AddShabaForm() {
  return (
    <FormLayout>
      <FormLayoutAlert>
        {"کارت باید متعلق به صاحب کد ملی 2940252614 باشد"}
      </FormLayoutAlert>
      <FormLayoutField>
        <FormLayoutLable>{"شماره شباه"}</FormLayoutLable>
        <InputText placeholder="شماره شباه را وارد کنید" />
      </FormLayoutField>
      <FormLayoutSubmit>{"ثبت شبا"}</FormLayoutSubmit>
    </FormLayout>
  );
}

export default AddShabaForm;
