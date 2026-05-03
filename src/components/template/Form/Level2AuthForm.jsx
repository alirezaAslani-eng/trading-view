import { InputSelect } from "@/components/ui/Input/InputSelect";
import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function Level2AuthForm() {
  return (
    <FormLayout>

      <FormLayoutFieldGroup>

        <FormLayoutField>
          <FormLayoutLable>{"استان"}</FormLayoutLable>
          <InputSelect placeholder="استان را انتخاب کنید"></InputSelect>
        </FormLayoutField>

        <FormLayoutField>
          <FormLayoutLable>{"شهر"}</FormLayoutLable>
          <InputSelect placeholder="شهر خود را انتخاب کنید"></InputSelect>
        </FormLayoutField>

      </FormLayoutFieldGroup>


      <FormLayoutField>
        <FormLayoutLable>{"آدرس محل سکونت"}</FormLayoutLable>
        <InputText textarea placeholder="کد پستی را وارد کنید" />
      </FormLayoutField>


      <FormLayoutFieldGroup>

        <FormLayoutField>
          <FormLayoutLable>{"کد پستی"}</FormLayoutLable>
          <InputText placeholder="کد پستی را وارد کنید" />
        </FormLayoutField>

        <FormLayoutField />

      </FormLayoutFieldGroup>

      <FormLayoutSubmit>{"ثبت اطلاعات"}</FormLayoutSubmit>
      
    </FormLayout>
  );
}

export default Level2AuthForm;
