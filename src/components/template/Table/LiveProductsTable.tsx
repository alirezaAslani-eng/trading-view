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

const products: Product[] = [
  {
    id: "prod-1",
    symbol: "میلگرد",
    currentPrice: 32500,
    change24h: 2.8,
    lowPrice: 31800,
    highPrice: 33200,
  },
  {
    id: "prod-2",
    symbol: "تیرآهن",
    currentPrice: 41800,
    change24h: -1.4,
    lowPrice: 41200,
    highPrice: 42700,
  },
  {
    id: "prod-3",
    symbol: "ورق سیاه",
    currentPrice: 35600,
    change24h: 0.9,
    lowPrice: 34900,
    highPrice: 36100,
  },
  {
    id: "prod-4",
    symbol: "ورق گالوانیزه",
    currentPrice: 47200,
    change24h: 4.1,
    lowPrice: 45100,
    highPrice: 47900,
  },
  {
    id: "prod-5",
    symbol: "نبشی",
    currentPrice: 28900,
    change24h: -0.7,
    lowPrice: 28500,
    highPrice: 29400,
  },
  {
    id: "prod-6",
    symbol: "ناودانی",
    currentPrice: 30100,
    change24h: 1.2,
    lowPrice: 29700,
    highPrice: 30600,
  },
  {
    id: "prod-7",
    symbol: "لوله صنعتی",
    currentPrice: 38700,
    change24h: -2.3,
    lowPrice: 38100,
    highPrice: 39800,
  },
  {
    id: "prod-8",
    symbol: "شمش فولادی",
    currentPrice: 26500,
    change24h: 3.5,
    lowPrice: 25800,
    highPrice: 27100,
  },
];

function LiveProductsTable_() {
  const { sorter } = useSortFilter();

  const columns: Column<Product>[] = [
    {
      field: "symbol",
      headerName: <TableSortToggler fieldPath={"symbol"} text="نماد" />,
    },
    {
      field: "currentPrice",
      headerName: (
        <TableSortToggler fieldPath={"currentPrice"} text="قیمت زنده" />
      ),
    },
    {
      field: "change24h",
      headerName: (
        <TableSortToggler fieldPath={"change24h"} text="تغیرات 24h" />
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
      field: "lowPrice",
      headerName: (
        <TableSortToggler fieldPath={"lowPrice"} text="کمترین قیمت" />
      ),
    },
    {
      field: "highPrice",
      headerName: "بیشترین قیمت",
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
        <TableControls />
      </PagePaperHeading>
      <DataTable rows={sorter(products)} columns={columns} />
    </PagePaper>
  );
}

function LiveProductsTable() {
  return (
    <SortFilterProvider defaultFieldPath="id">
      <LiveProductsTable_ />
    </SortFilterProvider>
  );
}
export default LiveProductsTable;

type Product = {
  id: string;
  symbol: string;
  currentPrice: number;
  change24h: number;
  lowPrice: number;
  highPrice: number;
};
