import { Transaction } from "@/api/types";
import { CreateBaseColumns } from "@/types";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";
import { PRICE_UNITS } from "../priceConfig";
import { TRANSACTION_TYPE_LABELS } from "./transactionType";
import { TRANSACTION_STATUS_LABELS } from "./transactionStatus";

export const transactionsBaseColumns = {
  createdAt: {
    headerName: "زمان",
    key: "createdAt",
    content(row) {
      const date = convertToJalali(row.createdAt).format(JALALI_FORMAT);
      const time = convertToJalali(row.createdAt).format("HH:mm");

      return `${date} | ${time}`;
    },
  },

  amount: {
    headerName: `مبلغ (${PRICE_UNITS.IRT.displayName})`,
    key: "amount",
    content(row) {
      return row.amount;
    },
  },

  type: {
    headerName: "نوع تراکنش",
    key: "type",
    content(row) {
      return TRANSACTION_TYPE_LABELS[row.type] ?? row.type;
    },
  },

  status: {
    headerName: "وضعیت",
    key: "status",
    content(row) {
      return TRANSACTION_STATUS_LABELS[row.status] ?? row.status;
    },
  },

  referenceId: {
    headerName: "شناسه پیگیری",
    key: "referenceId",
    content(row) {
      return row.referenceId;
    },
  },
  description: {
    headerName: "توضیحات",
    key: "description",
    content(row) {
      return row.description;
    },
  },
} satisfies CreateBaseColumns<Transaction>;
