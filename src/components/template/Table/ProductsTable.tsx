"use client";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import DataTable, { Column } from "@/components/ui/Table/DataTable";
import { Typography } from "@mui/material";
import TableSortToggler from "./TableSortToggler";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import { formatFaPrice, formatPrecent, getTrendColor } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { marketTickersKey } from "@/packages/react-query";
import { getMarketTickers } from "@/api";
import { MarketTicker } from "@/api/types";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";

const columns: Column<MarketTicker>[] = [
  {
    field: "symbol",
    headerName: "نماد",
  },
  {
    headerName: "قیمت لحظه ای",
    renderCell(row) {
      return formatFaPrice(row.lastPrice);
    },
  },
  {
    field: "change24h",
    headerName: "تغییرات 24h",
    renderCell: (row) => (
      <Typography
        variant="inherit"
        sx={{
          color: getTrendColor(row.change24h),
        }}
      >
        {formatPrecent(row.change24h)}
      </Typography>
    ),
  },
  {
    field: "low24h",
    headerName: "کمترین 24h",
    renderCell: (row) => (
      <Typography variant="inherit">{row.low24h}</Typography>
    ),
  },
  {
    field: "high24h",
    headerName: "بیشترین 24h",
    renderCell: (row) => (
      <Typography variant="inherit">{row.high24h}</Typography>
    ),
  },

  {
    headerName: "عملیات",
    renderCell: (row) => (
      <NextLink href={ROUTES.TRADE.BY_SYMBOL(row.symbol)}>
        <ButtonTableAction>{"معامله"}</ButtonTableAction>
      </NextLink>
    ),
  },
];

function ProductsTable() {
  const tickersQuery = useQuery({
    queryKey: marketTickersKey,
    queryFn: getMarketTickers,
  });
  const tickers = tickersQuery.data;

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "32px" }}>
        <PagePaperTitle>{"لیست محصولات"}</PagePaperTitle>
      </PagePaperHeading>

      <FallbackHandler
        isLoading={tickersQuery.isLoading}
        isError={tickersQuery.isError}
        dataLength={tickers?.length}
        fallbacks={{
          noData: (
            <TableFallback>
              <TableFallbackData />
            </TableFallback>
          ),
          loader: <TableFallbackLoader columns={columns} />,
        }}
      />

      {!tickersQuery.isLoading && !!tickers?.length && (
        <DataTable rows={tickers} columns={columns} />
      )}
    </PagePaper>
  );
}

export default ProductsTable;
