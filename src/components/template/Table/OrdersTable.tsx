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
        <DataTable columns={columns} rows={query.data?.items} />
      )}
    </>
  );
}

export default OrdersTable;
