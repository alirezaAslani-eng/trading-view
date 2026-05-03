import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutAlert,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function AddCreditCardForm() {
  return (
    <FormLayout>
      <FormLayoutAlert>
        {"کارت باید متعلق به صاحب کد ملی 2940252614 باشد"}
      </FormLayoutAlert>
      <FormLayoutField>
        <FormLayoutLable>{"شماره کارت"}</FormLayoutLable>
        <InputText placeholder="شماره کارت خود را وارد کنید" />
      </FormLayoutField>
      <FormLayoutSubmit>{"ثبت کارت"}</FormLayoutSubmit>
    </FormLayout>
  );
}

export default AddCreditCardForm;
