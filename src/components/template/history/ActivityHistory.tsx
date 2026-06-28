"use client";
import Button from "@/components/ui/Button/Button";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import DownloadIcon from "@/components/ui/Icon/DownloadIcon";

import {
  PagePaper,
  PagePaperHeading,
} from "@/components/ui/Layout/PaperLayout";
import { useOrderFiltersProvider } from "@/context/feature/orders/Orders/hooks";
import { OrderFiltersProvider } from "@/context/feature/orders/Orders/OrderFiltersContext";
import { OrdersProvider } from "@/context/feature/orders/Orders/OrdersContext";
import { Box, Divider, Stack, ToggleButton } from "@mui/material";
import InputSelectSymbol from "../Input/InputSelectSymbol";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import { OrderFilters, OrderType } from "@/types";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import OrdersTable from "../Table/OrdersTable";
import buildOrderColumns from "@/constant/features/order/orderColumns";
import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import OrdersPagination from "../Pagination/OrdersPagination";
import { createNonNullToggleHandler } from "@/packages/mui/theme";
import useUpdateEffect from "@/hooks/app/useUpdateEffect";
import { TransactionFiltersProvider } from "@/context/feature/transaction/Transactions/TransactionFiltersContext";
import { TransactionsProvider } from "@/context/feature/transaction/Transactions/TransactionsContext";
import { useTransactionFiltersProvider } from "@/context/feature/transaction/Transactions/hooks";
import { TRANSACTION_TYPE } from "@/constant/features/transaction/transactionType";
import TransactionsTable from "../Table/TransactionsTable";
import buildTransactionColumns from "@/constant/features/transaction/transactionColumns";

const orderColumns = buildOrderColumns();
const transactionColumns = buildTransactionColumns();

type TabState = "orders" | "deposit" | "withdraw";
const TABS: { value: TabState; displayName: string }[] = [
  { value: "orders", displayName: "سفارش‌ها" },
  { value: "deposit", displayName: "واریزها" },
  { value: "withdraw", displayName: "برداشت‌ها" },
];

function ActivityHistory() {
  const [tab, setTab] = useState<TabState>("orders");

  const tabHandler = createNonNullToggleHandler(setTab);

  const isOrdersTab = tab === "orders";
  const isTransactionsTab = tab === "deposit" || tab === "withdraw";

  // * ------------ Transaction Filtering ------------
  const transactionFilters = useTransactionFiltersProvider()!;

  const depositFilter = useEffectEvent(() => {
    transactionFilters.setFilter("TransactionType", TRANSACTION_TYPE.Deposit);
  });

  const withdrawFilter = useEffectEvent(() => {
    transactionFilters.setFilter(
      "TransactionType",
      TRANSACTION_TYPE.Withdrawal,
    );
  });

  useUpdateEffect(() => {
    if (tab === "deposit") depositFilter();
    if (tab === "withdraw") withdrawFilter();
  }, [tab]);

  return (
    <>
      <PagePaper>
        <Stack>
          <PagePaperHeading sx={{ mb: "40px" }}>
            {/* // * Tab Switcher */}
            <ToggleTabGroup onChange={tabHandler} value={tab}>
              {TABS.flatMap(({ value, displayName }, index) => [
                <ToggleButton key={value} value={value}>
                  {displayName}
                </ToggleButton>,
                index < TABS.length - 1 && (
                  <Divider key={`divider-${value}`} flexItem />
                ),
              ])}
            </ToggleTabGroup>

            {/* // * Export Button */}
            <Button sx={{ gap: "6px" }} variant="on-surface">
              <DownloadIcon />
              {"دانلود اکسل"}
            </Button>
          </PagePaperHeading>

          {/* // * Filter Bar */}
          {isOrdersTab && <OrderFilterControls />}

          {/* // * Tables  */}
          <Box sx={{ mt: "40px" }}>
            {isOrdersTab && <OrdersTable columns={orderColumns} />}
            {isTransactionsTab && (
              <TransactionsTable columns={transactionColumns} />
            )}
          </Box>

          {/* // * Pagination */}
        </Stack>
      </PagePaper>
      <Box sx={{ mt: "38px", display: "flex", justifyContent: "center" }}>
        {isOrdersTab && <OrdersPagination />}
      </Box>
    </>
  );
}

function ActivityHistoryProvider({ children }: PropsWithChildren) {
  return (
    <TransactionFiltersProvider>
      <TransactionsProvider>
        <OrderFiltersProvider defaultFilters={{ view: "history" }}>
          <OrdersProvider>{children}</OrdersProvider>
        </OrderFiltersProvider>
      </TransactionsProvider>
    </TransactionFiltersProvider>
  );
}

type OrderSideFilter = OrderFilters["orderSide"];

function OrderFilterControls() {
  const orderFilters = useOrderFiltersProvider()!;

  const orderSideHandler = (side: string | null) => {
    orderFilters.setFilter("orderSide", side as OrderSideFilter);
  };

  const symbolHandler = (symbol: string | null) => {
    orderFilters.setFilter("productCode", symbol as OrderSideFilter);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          width: "314px",
        }}
      >
        {/* // * Symbol  */}
        <InputSelectSymbol
          size="small"
          variant="outlined"
          color="primary"
          sx={{ flex: 1 }}
          //@ts-ignore
          onChange={symbolHandler}
          value={orderFilters.filters.productCode ?? ""}
        />

        {/* // * Order side  */}
        <InputSelect
          placeholder="سمت"
          size="small"
          variant="outlined"
          color="primary"
          sx={{ flex: 1 }}
          onChange={orderSideHandler}
          value={orderFilters.filters.orderSide ?? ""}
        >
          <InputSelectMenu>
            <InputSelectItem value={"Buy" satisfies OrderSideFilter}>
              {"خرید"}
            </InputSelectItem>
            <InputSelectItem value={"Sell" satisfies OrderSideFilter}>
              {"فروش"}
            </InputSelectItem>
          </InputSelectMenu>
        </InputSelect>
        {/* // * order status  */}
      </Box>
      <CheckBox
        variant="outlined"
        label="فقط سفارشات باز"
        checked={orderFilters.filters.view === "active"}
        onChange={(_, checked) => {
          orderFilters.setFilter("view", checked ? "active" : "history");
        }}
      />
    </Box>
  );
}
export { ActivityHistoryProvider, ActivityHistory };
