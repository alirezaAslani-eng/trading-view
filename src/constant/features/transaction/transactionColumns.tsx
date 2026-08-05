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
import { transactionsBaseColumns } from "./transactionBaseColumns";

type DefaultColumns = DefColumns<Transaction>;
const priceUnit = PRICE_UNITS.IRT.displayName;

export const transactionTableColumns: DefaultColumns = {
  createdAt: {
    headerName: transactionsBaseColumns.createdAt.headerName,
    field: transactionsBaseColumns.createdAt.key,

    renderCell(row) {
      return transactionsBaseColumns.createdAt.content(row);
    },
  },

  amount: {
    headerName: transactionsBaseColumns.amount.headerName,
    field: transactionsBaseColumns.amount.key,

    renderCell(row) {
      return formatFaPrice(
        transactionsBaseColumns.amount.content(row) as number,
      );
    },
  },

  type: {
    headerName: transactionsBaseColumns.type.headerName,
    field: transactionsBaseColumns.type.key,

    renderCell(row) {
      return transactionsBaseColumns.type.content(row);
    },
  },

  status: {
    headerName: transactionsBaseColumns.status.headerName,
    field: transactionsBaseColumns.status.key,

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
          {transactionsBaseColumns.status.content(row)}
        </Typography>
      );
    },
  },

  referenceId: {
    headerName: transactionsBaseColumns.referenceId.headerName,
    field: transactionsBaseColumns.referenceId.key,

    renderCell(row) {
      return transactionsBaseColumns.referenceId.content(row);
    },
  },
};

const buildTransactionColumns = (
  options?: BuildColumnsOptions<Transaction, DefaultColumns>,
): Column<Transaction>[] => {
  return buildColumns<Transaction>(transactionTableColumns, options);
};

export default buildTransactionColumns;
