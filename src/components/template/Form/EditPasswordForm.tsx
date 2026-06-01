import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

const EditPasswordForm = () => {
  return (
    <FormLayout>
        <FormLayoutField>
          <FormLayoutLable>{"رمز عبور فعلی"}</FormLayoutLable>
          <InputText type="password" placeholder="رمز عبور فعلی را وارد کنید" />
        </FormLayoutField>
        <FormLayoutField>
          <FormLayoutLable>{"رمز عبور جدید"}</FormLayoutLable>
          <InputText type="password" placeholder="رمز عبور جدید را وارد کنید" />
        </FormLayoutField>
        <FormLayoutField>
          <FormLayoutLable>{"تکرار رمز عبور جدید"}</FormLayoutLable>
          <InputText type="password" placeholder="تکرار رمز عبور جدید را وارد کنید" />
        </FormLayoutField>

      <FormLayoutSubmit>{"تغییر رمز عبور"}</FormLayoutSubmit>
    </FormLayout>
  );
}

export default EditPasswordForm;
