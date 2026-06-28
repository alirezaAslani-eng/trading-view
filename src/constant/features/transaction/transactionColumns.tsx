import { Column } from "@/components/ui/Table/DataTable";
import { Transaction } from "@/api/types";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";
import { PRICE_UNITS } from "../priceConfig";
import { TRANSACTION_TYPE_LABELS } from "./transactionType";
import {
  getTransactionStatus,
  TRANSACTION_STATUS_LABELS,
} from "./transactionStatus";
import { formatFaPrice } from "@/utils";
import {
  buildColumns,
  BuildColumnsOptions,
  DefColumns,
} from "@/utils/app/buildColumns";
import { Typography } from "@mui/material";

type DefaultColumns = DefColumns<Transaction>;
const priceUnit = PRICE_UNITS.IRT.displayName;

export const transactionTableColumns: DefaultColumns = {
  createdAt: {
    headerName: "زمان",
    field: "createdAt",
    renderCell(row) {
      return convertToJalali(row.createdAt).format(JALALI_FORMAT);
    },
  },
  amount: {
    headerName: `مبلغ (${priceUnit})`,
    renderCell(row) {
      return formatFaPrice(row.amount);
    },
  },
  type: {
    headerName: "نوع تراکنش",
    renderCell(row) {
      return TRANSACTION_TYPE_LABELS[row.type] ?? row.type;
    },
  },
  status: {
    headerName: "وضعیت",
    renderCell(row) {
      const { isFailed, isPending, isSuccess } = getTransactionStatus(
        row.status,
      );

      let color = "";
      if (isFailed) color = "text.error";
      if (isPending) color = "status.warning";
      if (isSuccess) color = "text.profit";

      return (
        <Typography sx={{ color }} variant="inherit">
          {TRANSACTION_STATUS_LABELS[row.status] ?? row.status}
        </Typography>
      );
    },
  },
  referenceId: {
    headerName: "شناسه پیگیری",
    field: "referenceId",
  },
};

const buildTransactionColumns = (
  options?: BuildColumnsOptions<Transaction, DefaultColumns>,
): Column<Transaction>[] => {
  return buildColumns<Transaction>(transactionTableColumns, options);
};

export default buildTransactionColumns;
