"use client";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import DataTable, { Column } from "@/components/ui/Table/DataTable";
import { Typography } from "@mui/material";
import TableSortToggler from "./TableSortToggler";
import {
  SortFilterProvider,
  useSortFilter,
} from "@/context/app/SortFilter/SortFilterContext";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import TableControls from "./TableControls";
import {
  ProductsTableProvider,
  useProductsTable,
  type ProductTableRow,
} from "./ProductsTableProvider";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import { formatFaPrice, formatPrecent, getTrendColor } from "@/utils";

const columns: Column<ProductTableRow>[] = [
  {
    field: "symbol",
    headerName: <TableSortToggler fieldPath={"symbol"} text="نماد" />,
  },
  {
    field: "currentPrice",
    headerName: (
      <TableSortToggler fieldPath={"currentPrice"} text="قیمت زنده" />
    ),
    renderCell(row) {
      return formatFaPrice(row.currentPrice);
    },
  },
  {
    field: "change24h",
    headerName: <TableSortToggler fieldPath={"change24h"} text="تغییرات 24h" />,
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
    headerName: <TableSortToggler fieldPath={"low24h"} text="کمترین 24h" />,
    renderCell: (row) => (
      <Typography variant="inherit">{row.low24h}</Typography>
    ),
  },
  {
    field: "high24h",
    headerName: <TableSortToggler fieldPath={"high24h"} text="بیشترین 24h" />,
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

function ProductsTable_() {
  const { sorter, searcher, searchQuery, setSearch } = useSortFilter();
  const { rows, isLoading, isError } = useProductsTable();

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "32px" }}>
        <PagePaperTitle>{"لیست محصولات"}</PagePaperTitle>
        <TableControls value={searchQuery} onChange={setSearch} />
      </PagePaperHeading>

      <FallbackHandler
        isLoading={isLoading}
        isError={isError}
        dataLength={rows.length}
        fallbacks={{
          noData: (
            <TableFallback>
              <TableFallbackData />
            </TableFallback>
          ),
          loader: (
            <TableFallback>
              <TableFallbackLoader />
            </TableFallback>
          ),
        }}
      />

      {!isLoading && !!rows.length && (
        <DataTable
          rows={sorter(searcher(rows, ["symbol"]))}
          columns={columns}
        />
      )}
    </PagePaper>
  );
}

function ProductsTable() {
  return (
    <ProductsTableProvider>
      <SortFilterProvider defaultFieldPath="symbol">
        <ProductsTable_ />
      </SortFilterProvider>
    </ProductsTableProvider>
  );
}
export default ProductsTable;
