"use client";
import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import DataTable from "@/components/ui/Table/DataTable";
import buildOrderColumns from "@/constant/features/order/orderColumns";
import useOrderFilters from "@/hooks/features/order/useOrderFilters";
import { createNonNullToggleHandler } from "@/packages/mui/theme";
import tradeTogglebuttonSell_sx from "@/packages/mui/theme/shared-style/features/trading/tradeTogglebuttonSell_sx";
import { ordersConfig } from "@/packages/react-query";
import { OrderFilters } from "@/types";
import { ToggleButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";
import {
  PagePaper,
  PagePaperHeading,
} from "@/components/ui/Layout/PaperLayout";
import { useTradeMode } from "@/context/feature/trade/TradeMode";

const orderColumns = buildOrderColumns({
  include: ["productCode", "totalWeight", "price", "status"],
});

type OrderSideFilter = OrderFilters["orderSide"];

function RecentOrdersTable() {
  const { isDemo } = useTradeMode();
  const orderFilters = useOrderFilters({
    view: "active",
    pageSize: 4,
    orderSide: "Buy",
  });

  const ordersQuery = useQuery(
    ordersConfig({ ...orderFilters.filters, isdemo: isDemo }),
  );
  const ordersLenght = ordersQuery.data?.items.length;

  const orderSideHandler = createNonNullToggleHandler<string>((value) =>
    orderFilters.setSide(value as OrderSideFilter),
  );
  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "14px" }}>
        <ToggleButtonGroup
          color="success"
          value={orderFilters.filters.orderSide}
          onChange={orderSideHandler}
          sx={{ width: "216px" }}
        >
          <ToggleButton value={"Buy" satisfies OrderSideFilter}>
            {"سفارشات خرید"}
          </ToggleButton>
          <ToggleButton
            value={"Sell" satisfies OrderSideFilter}
            sx={tradeTogglebuttonSell_sx}
          >
            {"سفارشات فروش"}
          </ToggleButton>
        </ToggleButtonGroup>
      </PagePaperHeading>

      <FallbackHandler
        isLoading={ordersQuery.isLoading}
        isError={ordersQuery.isError}
        dataLength={ordersLenght}
        fallbacks={{
          loader: <TableFallbackLoader columns={orderColumns} />,
          noData: (
            <TableFallback>
              <TableFallbackData />
            </TableFallback>
          ),
        }}
      />

      {!ordersQuery.isLoading && !!ordersLenght && (
        <DataTable columns={orderColumns} rows={ordersQuery.data?.items} />
      )}
    </PagePaper>
  );
}

export default RecentOrdersTable;
