import { Column } from "@/components/ui/Table/DataTable";
import { Order } from "@/api/types";
import { formatFaPrice } from "@/utils";
import normalizeOrderStatus from "@/utils/features/order/normalizeOrderStatus";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { WEIGHT_UNITS } from "../product/weightUnits";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import {
  buildColumns,
  BuildColumnsOptions,
  DefColumns,
} from "@/utils/app/buildColumns";
import CancleOrderTableAction from "@/components/template/Button/CancleOrderTableAction";
import { ordersBaseColumns } from "./orderBaseColumns";

type DefaultColumns = DefColumns<Order>;
const weightUnit = WEIGHT_UNITS.KG.lable;
export const orderTableColumns: DefaultColumns = {
  date: {
    headerName: ordersBaseColumns.date.headerName,
    field: ordersBaseColumns.date.key,

    renderCell(row) {
      return ordersBaseColumns.date.content(row);
    },
  },

  productCode: {
    headerName: ordersBaseColumns.productCode.headerName,
    field: ordersBaseColumns.productCode.key,

    renderCell(row) {
      return ordersBaseColumns.productCode.content(row);
    },
  },

  orderSide: {
    headerName: ordersBaseColumns.orderSide.headerName,
    field: ordersBaseColumns.orderSide.key,

    renderCell(row) {
      const isSeller = row.orderSide === "Sell";

      return (
        <Typography
          variant="inherit"
          sx={{
            color: isSeller ? "status.loss" : "text.profit",
          }}
        >
          {ordersBaseColumns.orderSide.content(row)}
        </Typography>
      );
    },
  },

  orderType: {
    headerName: ordersBaseColumns.orderType.headerName,
    field: ordersBaseColumns.orderType.key,

    renderCell(row) {
      return ordersBaseColumns.orderType.content(row);
    },
  },

  price: {
    headerName: ordersBaseColumns.price.headerName,
    field: ordersBaseColumns.price.key,

    renderCell(row) {
      return formatFaPrice(ordersBaseColumns.price.content(row) as number);
    },
  },

  totalWeight: {
    headerName: ordersBaseColumns.totalWeight.headerName,
    field: ordersBaseColumns.totalWeight.key,

    renderCell(row) {
      return `${ordersBaseColumns.totalWeight.content(row)} ${weightUnit}`;
    },
  },

  filledWeight: {
    headerName: ordersBaseColumns.filledWeight.headerName,
    field: ordersBaseColumns.filledWeight.key,

    renderCell(row) {
      return `${ordersBaseColumns.filledWeight.content(row)} ${weightUnit}`;
    },
  },

  remainingWeight: {
    headerName: ordersBaseColumns.remainingWeight.headerName,
    field: ordersBaseColumns.remainingWeight.key,

    renderCell(row) {
      return `${ordersBaseColumns.remainingWeight.content(row)} ${weightUnit}`;
    },
  },

  progress: {
    headerName: ordersBaseColumns.progress.headerName,
    field: ordersBaseColumns.progress.key,

    renderCell(row) {
      return <Progress value={row.progress} />;
    },
  },

  status: {
    headerName: ordersBaseColumns.status.headerName,
    field: ordersBaseColumns.status.key,

    renderCell(row) {
      const { isFaild, isPending } = normalizeOrderStatus(row.status);

      const color = isFaild
        ? "status.loss"
        : isPending
          ? "status.warning"
          : "text.profit";

      return (
        <Typography variant="caption1" sx={{ color }}>
          {ordersBaseColumns.status.content(row)}
        </Typography>
      );
    },
  },
};

const buildOrderColumns = (
  options?: BuildColumnsOptions<Order, DefaultColumns>,
): Column<Order>[] => {
  return buildColumns<Order>(orderTableColumns, {
    ...options,
    extra: [
      {
        headerName: "عملیات",
        renderCell(row) {
          return (
            <CancleOrderTableAction
              orderId={row.orderId}
              disabled={normalizeOrderStatus(row.status).isDone}
            />
          );
        },
      },
      ...(options?.extra ?? []),
    ],
  });
};

export default buildOrderColumns;

type ProgressProps = CircularProgressProps & {
  value: number;
};

function Progress({ value, ...props }: ProgressProps) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        {...props}
        sx={{ color: progressColor(value) }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ lineHeight: 1, color: "text.onPrimary" }}
        >
          {Math.round(value)}%
        </Typography>
      </Box>
    </Box>
  );
}

function progressColor(progress: number) {
  if (progress <= 10) return "status.loss";
  if (progress <= 30) return "status.warning";
  if (progress <= 50) return "text.primary2";
  return "status.profit";
}
