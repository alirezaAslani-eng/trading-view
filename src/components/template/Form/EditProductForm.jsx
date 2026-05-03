import CheckBox from "@/components/ui/Checkbox/CheckBox";
import { InputSelect } from "@/components/ui/Input/InputSelect";
import InputText from "@/components/ui/Input/InputText";
import {
  FormLayout,
  FormLayoutCheckbox,
  FormLayoutCheckboxGroup,
  FormLayoutField,
  FormLayoutFieldGroup,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";

function EditProductForm() {
  return (
    <FormLayout>
      <FormLayoutFieldGroup>
        <FormLayoutField>
          <FormLayoutLable>{"نماد"}</FormLayoutLable>
          <InputText placeholder="نماد محصول" />
        </FormLayoutField>
        <FormLayoutField>
          <FormLayoutLable>{"دسته بندی"}</FormLayoutLable>
          <InputSelect placeholder="دسته بندی را انتخاب کن" />
        </FormLayoutField>
      </FormLayoutFieldGroup>

      <FormLayoutFieldGroup>
        <FormLayoutField>
          <FormLayoutLable>{"کد محصول"}</FormLayoutLable>
          <InputSelect placeholder="کد را وارد کنید"></InputSelect>
        </FormLayoutField>
        <FormLayoutField>
          <FormLayoutLable>{"واحد اندازه گیری"}</FormLayoutLable>
          <InputSelect placeholder="واحد را انتخاب کن"></InputSelect>
        </FormLayoutField>
      </FormLayoutFieldGroup>

      <FormLayoutCheckbox>
        <FormLayoutLable component={"p"}>{"وضعیت محصول"}</FormLayoutLable>
        <FormLayoutCheckboxGroup>
          <CheckBox label={"فعال"} />
          <CheckBox label={"قیر فعال"} />
        </FormLayoutCheckboxGroup>
      </FormLayoutCheckbox>

      <FormLayoutSubmit color="error">{"ذخیره  تغییرات"}</FormLayoutSubmit>
    </FormLayout>
  );
}

export default EditProductForm;
