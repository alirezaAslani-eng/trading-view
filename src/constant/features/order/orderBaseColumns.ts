import { Order } from "@/api/types";
import { CreateBaseColumns } from "@/types";
import normalizeOrderStatus from "@/utils/features/order/normalizeOrderStatus";
import { ORDER_TYPE_LABELS } from "./orderType";
import { ORDER_SIDE_LABELS } from "./orderSide";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";
import { PRICE_UNITS } from "../priceConfig";
import { WEIGHT_UNITS } from "../product/weightUnits";

export const ordersBaseColumns = {
  date: {
    headerName: "تاریخ",
    key: "date",
    content(row) {
      const time = convertToJalali(row.date).format("HH:MM");
      const date = convertToJalali(row.date).format(JALALI_FORMAT);

      return `${date} | ${time}`;
    },
  },

  productCode: {
    headerName: "نماد",
    key: "productCode",
    content(row) {
      return row.productCode;
    },
  },

  orderSide: {
    headerName: "سمت",
    key: "orderSide",
    content(row) {
      return ORDER_SIDE_LABELS[row.orderSide];
    },
  },

  orderType: {
    headerName: "نوع",
    key: "orderType",
    content(row) {
      return ORDER_TYPE_LABELS[row.orderType];
    },
  },

  price: {
    headerName: `قیمت (${PRICE_UNITS.IRT.displayName})`,
    key: "price",
    content(row) {
      return row.price;
    },
  },

  totalWeight: {
    headerName: `وزن کل (${WEIGHT_UNITS.KG.lable})`,
    key: "totalWeight",
    content(row) {
      return row.totalWeight;
    },
  },

  filledWeight: {
    headerName: `وزن پر شده (${WEIGHT_UNITS.KG.lable})`,
    key: "filledWeight",
    content(row) {
      return row.filledWeight;
    },
  },

  remainingWeight: {
    headerName: `وزن باقی مانده (${WEIGHT_UNITS.KG.lable})`,
    key: "remainingWeight",
    content(row) {
      return row.remainingWeight;
    },
  },

  progress: {
    headerName: "درصد پر شده",
    key: "progress",
    content(row) {
      return row.progress;
    },
  },

  status: {
    headerName: "وضعیت",
    key: "status",
    content(row) {
      const { isFaild, isPending, isFilled } = normalizeOrderStatus(row.status);

      if (isPending) return "در حال تکمیل";
      if (isFaild) return "لغو";
      if (isFilled) return "تکمیل";

      return "";
    },
  },
} satisfies CreateBaseColumns<Order>;
