import { Transaction } from "@/api/types";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";
import { formatFaPrice } from "@/utils";

function mapTransactionToTable(transactions: Transaction[]) {
  const transactionTypeLabel: Record<string, string> = {
    TradeExecution: "انجام معامله",
    TradeLock: "قفل موجودی",
    Fee: "کارمزد",
    AdminAdjustment: "اصلاح توسط مدیر",
  };

  const transactionStatusLabel: Record<string, string> = {
    Success: "موفق",
    Failed: "ناموفق",
    Pending: "در انتظار",
  };
  return transactions.map((item) => ({
    تاریخ: convertToJalali(item.createdAt).format(`${JALALI_FORMAT} HH:mm`),
    "نوع تراکنش": transactionTypeLabel[item.type] ?? item.type,
    مبلغ: formatFaPrice(item.amount),
    وضعیت: transactionStatusLabel[item.status] ?? item.status,
    توضیحات: item.description,
    "شناسه مرجع": item.referenceId,
  }));
}

export default mapTransactionToTable;
