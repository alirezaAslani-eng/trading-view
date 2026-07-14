import { Order } from "@/api/types";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";
import { formatFaPrice } from "@/utils";
import normalizeOrderStatus from "@/utils/features/order/normalizeOrderStatus";
import { WEIGHT_UNITS } from "@/constant/features/product/weightUnits";

function mapOrderToExcel(rows: Order[]) {
  return rows.map((row) => {
    const { isFaild, isPending, isFilled } = normalizeOrderStatus(row.status);

    return {
      "تاریخ": `${convertToJalali(row.date).format(JALALI_FORMAT)} | ${convertToJalali(row.date).format("HH:mm")}`,

      "نماد": row.productCode,

      "سمت": row.orderSide === "Sell" ? "فروشنده" : "خریدار",

      "نوع": row.orderType === "Limit" ? "تعیین قیمت" : "فوری",

      "قیمت": formatFaPrice(row.price),

      "مقدار": `${row.totalWeight} ${WEIGHT_UNITS.KG.lable}`,

      "وضعیت":
        isPending
          ? "در حال تکمیل"
          : isFaild
            ? "لغو"
            : isFilled
              ? "تکمیل"
              : "",
    };
  });
}

export default mapOrderToExcel;