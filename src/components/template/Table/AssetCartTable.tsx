"use client";
import DataTable from "@/components/ui/Table/DataTable";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { ChangeEvent } from "react";
import InputText from "@/components/ui/Input/InputText";
import useSearch from "@/hooks/app/useSearch";
import InputMarker from "@/components/ui/Marker/InputMarker";
import { SearchIcon } from "@/components/ui/Icon";
import { buildAssetColumns } from "@/constant/features/wallet/assetsColumns";
import { extractNonIRTAssets } from "@/utils/features/wallet/walletProtofolioTransformers";
import { useQuery } from "@tanstack/react-query";
import { walletPortfolioConfig } from "@/packages/react-query";
import { useTradeMode } from "@/context/feature/trade/TradeMode";
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

const columns = buildAssetColumns();

function AssetCartTable() {
  const { isDemo } = useTradeMode();

  const assetsQuery = useQuery({
    ...walletPortfolioConfig(isDemo),
    select: extractNonIRTAssets,
  });

  const { search, searchQuery, setSearchQuery } = useSearch();

  const searchHandler = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearchQuery(e.target.value);
  };

  const isVisableTable = assetsQuery.isSuccess && !!assetsQuery.data.length;

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
