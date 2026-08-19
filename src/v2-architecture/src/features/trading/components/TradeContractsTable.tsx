"use client";
import DataTable from "@/components/ui/Table/DataTable";
import { useQuery } from "@tanstack/react-query";

import {
  TRADE_CONTRACT_STATUS_LABELS,
  TradeContract,
  TradeContractStatus,
} from "@/v2-architecture/src/entity/trading";
import { buildColumns } from "@/utils/app/buildColumns";
import { formatFaPrice } from "@/utils";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
import {
  settleTradeContractConfig,
  tradeContractsConfig,
} from "../react-query";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";
import { Chip, CircularProgress, Typography } from "@mui/material";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import { useMutation } from "@tanstack/react-query";
import { show } from "@ebay/nice-modal-react";
import { GenericConfirmDialog } from "@/packages/nice-modal-react";

const statusColors: Record<TradeContractStatus, string> = {
  Canceled: "text.error",
  Settled: "status.profit",
  Pending: "status.warning",
} as const;
const priceUnitDisplay = PRICE_UNITS.IRT.displayName;

type SettleTradeContractActionProps = {
  id: string;
};

function SettleTradeContractAction({ id }: SettleTradeContractActionProps) {
  const mutation = useMutation(settleTradeContractConfig());
  const handleSettle = async () => {
    const isConfirmed = await show(GenericConfirmDialog, {
      title: "تأیید پرداخت قرارداد",
      description:
        "با تأیید این عملیات، مبلغ بدهی قرارداد از موجودی کیف پول شما کسر خواهد شد. آیا از پرداخت این مبلغ اطمینان دارید؟",
    });
    if (!isConfirmed) return;
    mutation.mutate({ id });
  };

  return (
    <ButtonTableAction onClick={handleSettle} disabled={mutation.isPending}>
      {mutation.isPending ? (
        <CircularProgress color="inherit" size={16} />
      ) : (
        "پرداخت"
      )}
    </ButtonTableAction>
  );
}
const tradeContractsColumns = buildColumns<TradeContract>(
  {
    productCode: {
      field: "productCode",
      headerName: "محصول",
      renderCell: (row) => row.productCode,
    },

    matchPrice: {
      field: "matchPrice",
      headerName: "قیمت معامله",
      renderCell: (row) =>
        `${formatFaPrice(row.matchPrice)} ${priceUnitDisplay}`,
    },

    matchWeight: {
      field: "matchWeight",
      headerName: "وزن معامله",
      renderCell: (row) => formatFaPrice(row.matchWeight),
    },

    totalValue: {
      field: "totalValue",
      headerName: "ارزش کل",
      renderCell: (row) =>
        `${formatFaPrice(row.totalValue)} ${priceUnitDisplay}`,
    },

    depositPaid: {
      field: "depositPaid",
      headerName: "مبلغ پرداخت شده",
      renderCell: (row) =>
        `${formatFaPrice(row.depositPaid)} ${priceUnitDisplay}`,
    },

    remaningDebt: {
      field: "remaningDebt",
      headerName: "بدهی باقی‌مانده",
      renderCell: (row) =>
        `${formatFaPrice(row.remaningDebt)} ${priceUnitDisplay}`,
    },

    penaltyAmount: {
      field: "penaltyAmount",
      headerName: "مبلغ جریمه",
      renderCell: (row) => {
        if (row.penaltyAmount === 0) return "صفر";
        return (
          <Chip
            label={`${formatFaPrice(row.penaltyAmount)} ${priceUnitDisplay}`}
            variant="outlined"
            color="warning"
            size="small"
          />
        );
      },
    },

    createdAt: {
      field: "createdAt",
      headerName: "تاریخ ایجاد",
      renderCell: (row) => convertToJalali(row.createdAt).format(JALALI_FORMAT),
    },

    status: {
      field: "status",
      headerName: "وضعیت",
      renderCell: (row) => {
        return (
          <Typography
            variant="inherit"
            sx={{ color: statusColors[row.status] }}
          >
            {TRADE_CONTRACT_STATUS_LABELS[row.status]}
          </Typography>
        );
      },
    },
  },
  {
    extra: [
      {
        headerName: "عملیات",
        renderCell(row) {
          return <SettleTradeContractAction id={row.id} />;
        },
      },
    ],
  },
);

function ContractsTable() {
  const query = useQuery(tradeContractsConfig());

  const rows = query.data ?? [];
  const dataLength = rows.length;

  return (
    <>
      <FallbackHandler
        isLoading={query.isLoading}
        isError={query.isError}
        dataLength={dataLength}
        fallbacks={{
          loader: <TableFallbackLoader columns={tradeContractsColumns} />,
          noData: (
            <TableFallback>
              <TableFallbackData />
            </TableFallback>
          ),
        }}
      />

      {!query.isPending && !!dataLength && (
        <DataTable columns={tradeContractsColumns} rows={rows} />
      )}
    </>
  );
}

export default ContractsTable;
