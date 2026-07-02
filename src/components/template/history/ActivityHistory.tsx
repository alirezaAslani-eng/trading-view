"use client";
import Button from "@/components/ui/Button/Button";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import DownloadIcon from "@/components/ui/Icon/DownloadIcon";
import { useOrderFiltersProvider } from "@/context/feature/orders/Orders/hooks";
import { OrderFiltersProvider } from "@/context/feature/orders/Orders/OrderFiltersContext";
import { OrdersProvider } from "@/context/feature/orders/Orders/OrdersContext";
import { Box, Divider, Stack, ToggleButton } from "@mui/material";
import { OrderFilters, TransactionFilters } from "@/types";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import OrdersTable from "../Table/OrdersTable";
import buildOrderColumns from "@/constant/features/order/orderColumns";
import { PropsWithChildren, useState } from "react";
import OrdersPagination from "../Pagination/OrdersPagination";
import { createNonNullToggleHandler } from "@/packages/mui/theme";
import { TransactionFiltersProvider } from "@/context/feature/transaction/Transactions/TransactionFiltersContext";
import { TransactionsProvider } from "@/context/feature/transaction/Transactions/TransactionsContext";
import { useTransactionFiltersProvider } from "@/context/feature/transaction/Transactions/hooks";
import TransactionsTable from "../Table/TransactionsTable";
import buildTransactionColumns from "@/constant/features/transaction/transactionColumns";

import {
  PagePaper,
  PagePaperHeading,
} from "@/components/ui/Layout/PaperLayout";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  TRANSACTION_TYPE,
  TRANSACTION_TYPE_LABELS,
} from "@/constant/features/transaction/transactionType";
import TransactionsPagination from "../Pagination/TransactionsPagination";
import { useQuery } from "@tanstack/react-query";
import { symbolsConfig } from "@/packages/react-query";
import { SelectInputLoader } from "@/components/ui/Fallback/SelectInputLoader";

const orderColumns = buildOrderColumns();
const transactionColumns = buildTransactionColumns();

type TabState = "orders" | "transactions";
const TABS: { value: TabState; displayName: string }[] = [
  { value: "orders", displayName: "تاریخچه  سفارش ها" },
  { value: "transactions", displayName:"تاریخچه معاملات"  },
];

function ActivityHistory() {
  const [tab, setTab] = useState<TabState>("orders");

  const tabHandler = createNonNullToggleHandler(setTab);

  const isOrdersTab = tab === "orders";
  const isTransactionsTab = tab === "transactions";

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
          {isTransactionsTab && <TransactionFilterControls />}

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
        {isTransactionsTab && <TransactionsPagination />}
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

function TransactionFilterControls() {
  const transactionFilters = useTransactionFiltersProvider()!;

  const transactionTypeHandler = (type: string) => {
    transactionFilters.setFilter(
      "Type",
      type ? (type as TransactionFilters["Type"]) : null,
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <InputSelect
        sx={{ width: "200px" }}
        variant="outlined"
        size="small"
        placeholder="نوع تراکنش"
        value={transactionFilters.filters.Type ?? ""}
        onChange={transactionTypeHandler}
      >
        <InputSelectMenu>
          <InputSelectItem value={""}>{"همه"}</InputSelectItem>
          {Object.keys(TRANSACTION_TYPE).map((type) => {
            const type_key = type as keyof typeof TRANSACTION_TYPE;
            return (
              <InputSelectItem value={TRANSACTION_TYPE[type_key]}>
                {TRANSACTION_TYPE_LABELS[type_key]}
              </InputSelectItem>
            );
          })}
        </InputSelectMenu>
      </InputSelect>
    </Box>
  );
}
function OrderFilterControls() {
  const orderFilters = useOrderFiltersProvider()!;

  const symbolsQuery = useQuery(symbolsConfig());

  const orderSideHandler = (side: string | null) => {
    orderFilters.setFilter(
      "orderSide",
      side ? (side as OrderSideFilter) : null,
    );
  };

  const symbolHandler = (symbol: string | null) => {
    orderFilters.setFilter(
      "productCode",
      symbol ? (symbol as OrderSideFilter) : null,
    );
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
        <InputSelect
          size="small"
          variant="outlined"
          color="primary"
          sx={{ flex: 1 }}
          placeholder="نماد"
          //@ts-ignore
          onChange={symbolHandler}
          value={orderFilters.filters.productCode ?? ""}
        >
          <InputSelectMenu>
            {symbolsQuery.isLoading && <SelectInputLoader />}

            {!symbolsQuery.isLoading && (
              <InputSelectItem value={""}>{"همه"}</InputSelectItem>
            )}

            {!symbolsQuery.isLoading &&
              symbolsQuery.data?.map((symbol) => {
                return (
                  <InputSelectItem value={symbol.name}>
                    {symbol.name}
                  </InputSelectItem>
                );
              })}
          </InputSelectMenu>
        </InputSelect>

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
            <InputSelectItem value={""}>{"همه"}</InputSelectItem>
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
