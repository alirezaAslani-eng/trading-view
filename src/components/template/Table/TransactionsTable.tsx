"use client";
import DataTable, { Column } from "@/components/ui/Table/DataTable";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { Transaction } from "@/api/types";
import { useTransactions } from "@/context/feature/transaction/Transactions/hooks";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";

function TransactionsTable({ columns }: { columns: Column<Transaction>[] }) {
  const query = useTransactions()!;
  const dataLength = query.data?.items.length;
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
        <DataTable<Transaction> columns={columns} rows={query.data?.items} />
      )}
    </>
  );
}

export default TransactionsTable;
