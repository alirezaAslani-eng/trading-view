import { WithdrawWarningList } from "../types";
import { PRICE_UNITS } from "@/constant/features/priceConfig";

const withdrawWarnings: WithdrawWarningList = [
  { warning: `حداقل مقدار برداشت 20،000 ${PRICE_UNITS.IRT.displayName} است` },
  {
    warning:
      "درخواست‌های برداشت ثبت‌شده، وارد صف سیکل‌های پایا شده و در اولین سیکل یا در برخی موارد تا ۴۸ ساعت تسویه خواهد شد.",
  },
];

export default withdrawWarnings;