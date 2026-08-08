import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { loyaltyRulesKey } from "./keys";
import { editLoyaltyRule, editLoyaltyRuleVariables } from "../api/editLoyaltyRule";

export const editLoyaltyRuleConfig = createMutationOptions({
  meta: {
    successMessage: "قانون سطح‌بندی با موفقیت ذخیره شد",
    invalidates: [loyaltyRulesKey],
  },
  mutationFn: (vars: editLoyaltyRuleVariables) => {
    return editLoyaltyRule({ body: vars });
  },
});
