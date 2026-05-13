import { AddIcon } from "@/components/ui/Icon";
import { InputSelect } from "@/components/ui/Input/InputSelect";
import InputText from "@/components/ui/Input/InputText";
import {
  TransactionFormLayout,
  TransactionFormLayoutField,
  TransactionFormLayoutFieldAutoFiller,
  TransactionFormLayoutFieldContainer,
  TransactionFormLayoutLabel,
  TransactionFormLayoutSubmit,
} from "@/components/ui/Layout/TransactionFormLayout";

function WithdrawForm() {
  return (
    <TransactionFormLayout>
      <TransactionFormLayoutField>
        <TransactionFormLayoutLabel>{"واریز به"}</TransactionFormLayoutLabel>
        <InputSelect
          sx={{ flex: 1 }}
          size="medium"
          placeholder="لطفا شماره شبای خود را انتخاب کنید"
        />
      </TransactionFormLayoutField>

      <TransactionFormLayoutFieldContainer>
        <TransactionFormLayoutFieldAutoFiller>
          {"برداشت کل موجودی"}
        </TransactionFormLayoutFieldAutoFiller>
        <TransactionFormLayoutField>
          <TransactionFormLayoutLabel>
            {"مبلغ مورد نظر"}
          </TransactionFormLayoutLabel>
          <InputText
            sx={{ flex: 1 }}
            size="medium"
            placeholder="مبلغ مورد نظر را به تومان وارد کنید"
          />
        </TransactionFormLayoutField>
      </TransactionFormLayoutFieldContainer>

      <TransactionFormLayoutSubmit>
        <AddIcon sx={{ color: "inherit" }} />
        {"افزودن شبای جدید"}
      </TransactionFormLayoutSubmit>
    </TransactionFormLayout>
  );
}

export default WithdrawForm;
