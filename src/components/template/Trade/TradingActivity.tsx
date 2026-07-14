"use client";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import { OrderFiltersProvider } from "@/context/feature/orders/Orders/OrderFiltersContext";
import { OrdersProvider } from "@/context/feature/orders/Orders/OrdersContext";
import { createNonNullToggleHandler } from "@/packages/mui/theme";
import { Box, Divider, ToggleButton } from "@mui/material";
import { PropsWithChildren, useEffectEvent, useState } from "react";
import OrdersTable from "../Table/OrdersTable";
import { buildAssetColumns } from "@/constant/features/wallet/assetsColumns";
import CancleOrderTableAction from "../Button/CancleOrderTableAction";
import OrdersPagination from "@/components/template/Pagination/OrdersPagination";
import buildOrderColumns from "@/constant/features/order/orderColumns";
import {
  PagePaper,
  PagePaperHeading,
} from "@/components/ui/Layout/PaperLayout";
import AssetsTable from "../Table/AssetsTable";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";
import { useOrderFiltersProvider } from "@/context/feature/orders/Orders/hooks";
import useUpdateEffect from "@/hooks/app/useUpdateEffect";
import { orderHistoryColumns } from "@/constant/features/order/orderHistoryColumns";

type TabType = "active-orders" | "assets" | "order-history";

// * -------------- Table Columns --------------
const assetColumns = buildAssetColumns({
  extra: [
    {
      headerName: "عملیات",
      renderCell(row) {
        return (
          <NextLink href={ROUTES.TRADE.BY_SYMBOL(row.assetSymbol)}>
            <ButtonTableAction>{"معامله"}</ButtonTableAction>
          </NextLink>
        );
      },
    },
  ],
});

const activeOrderColumns = buildOrderColumns({
  extra: [
    {
      headerName: "عملیات",
      renderCell(row) {
        return <CancleOrderTableAction orderId={row.orderId} />;
      },
    },
  ],
});

function TradingActivity_() {
  // * ----------- Tab State Management -----------
  const [tab, setTab] = useState<TabType>("active-orders");

  const isOrdersTab = tab === "active-orders" || tab === "order-history";
  const isAssetsTab = tab === "assets";

  const tabHandler = createNonNullToggleHandler(setTab);

  // * ---------------- Order Filtering ----------------
  const orderFilters = useOrderFiltersProvider()!;

  const setOrderHistory = useEffectEvent(() => {
    orderFilters.setView("history");
  });
  const setActiveOrders = useEffectEvent(() => {
    orderFilters.setView("active");
  });
  useUpdateEffect(() => {
    if (tab === "active-orders") setActiveOrders();
    if (tab === "order-history") setOrderHistory();
  }, [tab]);

  return (
    <>
      <PagePaper>
        <PagePaperHeading sx={{ mb: "32px" }}>
          {/* // * Tabs Switcher */}
          <ToggleTabGroup value={tab} onChange={tabHandler}>
            <ToggleButton value={"active-orders" satisfies TabType}>
              {"سفارش‌های باز"}
            </ToggleButton>

            <Divider flexItem orientation="vertical" />

            <ToggleButton value={"order-history" satisfies TabType}>
              {"تاریخچه معاملات"}
            </ToggleButton>
            <Divider flexItem orientation="vertical" />
            <ToggleButton value={"assets" satisfies TabType}>
              {"دارایی"}
            </ToggleButton>
          </ToggleTabGroup>
        </PagePaperHeading>

        {/* // * Orders Table */}
        {isOrdersTab && (
          <OrdersTable
            columns={
              orderFilters.filters.view === "active"
                ? activeOrderColumns
                : orderHistoryColumns
            }
          />
        )}

        {/* // * Assets Table */}
        {isAssetsTab && <AssetsTable columns={assetColumns} />}
      </PagePaper>

      {/* // * Orders Pagination */}
      {isOrdersTab && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
          <OrdersPagination />
        </Box>
      )}
    </>
  );
}

function TradingActivity() {
  return (
    <OrderFiltersProvider defaultFilters={{ view: "active", pageSize: 10 }}>
      <OrdersProvider>
        <TradingActivity_ />
      </OrdersProvider>
    </OrderFiltersProvider>
  );
}
export default TradingActivity;
