"use client";
import DataTable, { Column } from "@/components/ui/Table/DataTable";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { WalletAsset } from "@/api/types";
import { walletPortfolioConfig } from "@/packages/react-query";
import { useQuery } from "@tanstack/react-query";
import { extractNonIRTAssets } from "@/utils/features/wallet/walletProtofolioTransformers";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";
const queryConfig = walletPortfolioConfig();

function AssetsTable({ columns }: { columns: Column<WalletAsset>[] }) {
  const query = useQuery(queryConfig);
  const dataLength = query.data?.assets.length;

  const noneIrtAssets = extractNonIRTAssets(query.data);

  return (
    <>
      <FallbackHandler
        isLoading={query.isLoading}
        isError={query.isError}
        dataLength={dataLength}
        fallbacks={{
          loader: <TableFallbackLoader columns={columns} />,
          noData: (
            <TableFallback>
              {/* // TODO Show the reason why data is empty */}
              <TableFallbackData />
            </TableFallback>
          ),
        }}
      />
      {!query.isLoading && !!dataLength && (
        <DataTable columns={columns} rows={noneIrtAssets} />
      )}
    </>
  );
}

export default AssetsTable;
