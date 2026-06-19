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

function ProductsTable_() {
  const { sorter, searcher, searchQuery, setSearch } = useSortFilter();
  const { rows, isLoading, isError } = useProductsTable();

  const columns: Column<ProductTableRow>[] = [
    {
      field: "symbol",
      headerName: <TableSortToggler fieldPath={"symbol"} text="نماد" />,
    },
    {
      field: "name",
      headerName: <TableSortToggler fieldPath={"name"} text="نام محصول" />,
    },
    {
      field: "currentPrice",
      headerName: (
        <TableSortToggler fieldPath={"currentPrice"} text="قیمت زنده" />
      ),
    },
    {
      field: "high24h",
      headerName: <TableSortToggler fieldPath={"high24h"} text="بیشترین 24h" />,
      renderCell: (row) => (
        <Typography variant="inherit" sx={{ color: "text.profit" }}>
          {row.high24h}
        </Typography>
      ),
    },
    {
      field: "low24h",
      headerName: <TableSortToggler fieldPath={"low24h"} text="کمترین 24h" />,
      renderCell: (row) => (
        <Typography variant="inherit" sx={{ color: "status.loss" }}>
          {row.low24h}
        </Typography>
      ),
    },
    {
      field: "change24h",
      headerName: (
        <TableSortToggler fieldPath={"change24h"} text="تغییرات 24h" />
      ),
      renderCell: (row) => (
        <Typography
          variant="inherit"
          sx={{
            color: row.change24h < 0 ? "status.loss" : "text.profit",
          }}
        >
          % {row.change24h}
        </Typography>
      ),
    },
    {
      field: "change7d",
      headerName: (
        <TableSortToggler fieldPath={"change7d"} text="تغییرات 7d" />
      ),
      renderCell: (row) => (
        <Typography
          variant="inherit"
          sx={{
            color: row.change7d < 0 ? "status.loss" : "text.profit",
          }}
        >
          % {row.change7d}
        </Typography>
      ),
    },
    {
      field: "change30d",
      headerName: (
        <TableSortToggler fieldPath={"change30d"} text="تغییرات 30d" />
      ),
      renderCell: (row) => (
        <Typography
          variant="inherit"
          sx={{
            color: row.change30d < 0 ? "status.loss" : "text.profit",
          }}
        >
          % {row.change30d}
        </Typography>
      ),
    },
    {
      field: "volume24h",
      headerName: <TableSortToggler fieldPath={"volume24h"} text="حجم 24h" />,
    },
    {
      headerName: "عملیات",
      renderCell: () => <ButtonTableAction>{"معامله"}</ButtonTableAction>,
    },
  ];

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
          rows={sorter(searcher(rows, ["symbol", "name"]))}
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
