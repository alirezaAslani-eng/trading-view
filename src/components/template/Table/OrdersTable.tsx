"use client";
import DataTable, { Column } from "@/components/ui/Table/DataTable";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { Order } from "@/api/types";
import { useOrders } from "@/context/feature/orders/Orders/hooks";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";

function OrdersTable({ columns }: { columns: Column<Order>[] }) {
  const query = useOrders()!;
  return (
    <>
      <FallbackHandler
        isLoading={query.isLoading}
        isError={query.isError}
        dataLength={query.data?.items.length}
        fallbacks={{
          loader: <TableFallbackLoader columns={columns} />,
          noData: (
            <TableFallback>
              <TableFallbackData />
            </TableFallback>
          ),
        }}
      />

      {query.isSuccess && (
        <DataTable columns={columns} rows={query.data.items} />
      )}
    </>
  );
}

export default OrdersTable;
