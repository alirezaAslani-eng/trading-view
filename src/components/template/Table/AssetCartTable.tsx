"use client";
import DataTable, { Column } from "@/components/ui/Table/DataTable";
import { WalletAsset } from "@/api/types";
import { Box, debounce } from "@mui/material";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import NextLink from "@/components/ui/Link/NextLink";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { ChangeEvent } from "react";
import useAssetsQuery from "@/hooks/features/wallet/useAssetsQuery";
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
import { formatFaPrice } from "@/utils";
import InputText from "@/components/ui/Input/InputText";
import useSearch from "@/hooks/app/useSearch";
import InputMarker from "@/components/ui/Marker/InputMarker";
import { SearchIcon } from "@/components/ui/Icon";
import { ROUTES } from "@/constant/app/routes";
import { PRICE_UNITS } from "@/constant/features/priceConfig";

const columns: Column<WalletAsset>[] = [
  { field: "assetSymbol", headerName: "نماد" },
  {
    headerName: "مقدار در دسترس",
    renderCell(row) {
      return `${formatFaPrice(row.availableBalance ?? "")} کیلو`;
    },
  },
  {
    headerName: "مقدار قفل شده",
    renderCell(row) {
      return `${formatFaPrice(row.lockedBalance ?? "")} ${PRICE_UNITS.IRT.displayName} `;
    },
  },
  {
    headerName: "ارزش کل به ریال",
    renderCell(row) {
      return formatFaPrice(row.totalValueInIrt ?? "");
    },
  },
  {
    headerName: "قیمت زنده",
    renderCell(row) {
      return `${formatFaPrice(row.livePrice ?? "")} ${PRICE_UNITS.IRT.displayName} `;
    },
  },
  {
    headerName: "عملیات",
    renderCell(row) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <NextLink href={ROUTES.TRADE.BY_SYMBOL(row.assetSymbol)}>
            <ButtonTableAction>{"معامله"}</ButtonTableAction>
          </NextLink>
        </Box>
      );
    },
  },
];

function AssetCartTable() {
  const assetsQuery = useAssetsQuery();

  const { search, searchQuery, setSearchQuery } = useSearch();

  const searchHandler = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value);
  };

  const isVisableTable =
    assetsQuery.status === "success" && !!assetsQuery.data.length;

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "40px" }}>
        <PagePaperTitle>{"همه دارایی ها"}</PagePaperTitle>

        <InputMarker
          right="10px"
          icon={
            <SearchIcon
              sx={{ width: "16px", height: "16px", color: "text.caption" }}
            />
          }
        >
          <InputText
            value={searchQuery}
            onChange={searchHandler}
            placeholder="جستجو نماد"
            size="small"
            sx={{ width: "194px", pr: "32px" }}
          />
        </InputMarker>
      </PagePaperHeading>

      <FallbackHandler
        isLoading={assetsQuery.isLoading}
        isError={assetsQuery.isError}
        dataLength={assetsQuery.data?.length}
        fallbacks={{
          loader: (
            <TableFallback>
              <TableFallbackLoader />
            </TableFallback>
          ),
          noData: (
            <TableFallback>
              <TableFallbackData />
            </TableFallback>
          ),
        }}
      />

      {isVisableTable && (
        <DataTable
          rows={search(assetsQuery.data, ["assetSymbol"])}
          columns={columns}
        />
      )}
    </PagePaper>
  );
}

export default AssetCartTable;