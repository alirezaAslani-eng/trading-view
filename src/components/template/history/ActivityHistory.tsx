"use client";
import Button from "@/components/ui/Button/Button";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import DownloadIcon from "@/components/ui/Icon/DownloadIcon";
import {
  useOrders,
  useOrderFiltersProvider,
} from "@/context/feature/orders/Orders/hooks";
import { OrderFiltersProvider } from "@/context/feature/orders/Orders/OrderFiltersContext";
import { OrdersProvider } from "@/context/feature/orders/Orders/OrdersContext";
import { Box, Divider, Stack, ToggleButton } from "@mui/material";
import { OrderFilters, TransactionFilters } from "@/types";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import OrdersTable from "../Table/OrdersTable";
import { PropsWithChildren, useState } from "react";
import OrdersPagination from "../Pagination/OrdersPagination";
import { createNonNullToggleHandler } from "@/packages/mui/theme";
import { TransactionFiltersProvider } from "@/context/feature/transaction/Transactions/TransactionFiltersContext";
import { TransactionsProvider } from "@/context/feature/transaction/Transactions/TransactionsContext";
import {
  useTransactionFiltersProvider,
  useTransactions,
} from "@/context/feature/transaction/Transactions/hooks";
import TransactionsTable from "../Table/TransactionsTable";
import buildTransactionColumns from "@/constant/features/transaction/transactionColumns";
import { TRANSACTION_TYPE_LIST } from "@/constant/features/transaction/transactionType";
import TransactionsPagination from "../Pagination/TransactionsPagination";
import { useQuery } from "@tanstack/react-query";
import { symbolsConfig } from "@/packages/react-query";
import { SelectInputLoader } from "@/components/ui/Fallback/SelectInputLoader";
import { exportExcel } from "@/utils/app/exportExcel";
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
  filterToSelectValue,
  SELECT_FILTER_ALL,
  selectValueToFilter,
} from "@/utils/app/filter";
import mapOrderToExcel from "@/utils/features/order/mapOrderToExcel";
import mapTransactionToExcel from "@/utils/features/transaction/mapTransactionToExcel";
import { useQueryClient } from "@tanstack/react-query";
import { ordersConfig, transactionsConfig } from "@/packages/react-query";
import {
  DateCalanderMenu,
  DateCalanderProvider,
  DateCalanderTrigger,
  DateCalendarDropdown,
  DateValueDisplay,
} from "@/components/ui/DateCalendar/DateCalanderDropdown";
import buildOrderColumns from "@/constant/features/order/orderColumns";
const transactionColumns = buildTransactionColumns();
const orderColumns = buildOrderColumns();

type TabState = "orders" | "transactions";

const TABS: { value: TabState; displayName: string }[] = [
  { value: "orders", displayName: "تاریخچه معاملات" },
  { value: "transactions", displayName: "تراکنش ها" },
];

function ActivityHistory() {
  const [tab, setTab] = useState<TabState>("orders");

  const queryClient = useQueryClient();

  const orderFilters = useOrderFiltersProvider()!;
  const transactionFilters = useTransactionFiltersProvider()!;

  const orders = useOrders()!;
  const transactions = useTransactions()!;

  const tabHandler = createNonNullToggleHandler(setTab);

  const isOrdersTab = tab === "orders";
  const isTransactionsTab = tab === "transactions";

  const isExportDisabled =
    tab === "orders"
      ? orders.isLoading || (orders.data?.totalCount ?? 0) === 0
      : transactions.isLoading || (transactions.data?.totalCount ?? 0) === 0;

  const handleExport = async () => {
    if (tab === "orders") {
      const data = await queryClient.fetchQuery(
        ordersConfig({ ...orderFilters.filters, page: 1, pageSize: 1000 })
      );

      exportExcel({
        fileName: "orders",
        rows: mapOrderToExcel(data.items),
      });

      return;
    }
    const data = await queryClient.fetchQuery(
      transactionsConfig({
        ...transactionFilters.filters,
        page: 1,
        pageSize: 1000,
      })
    );
    exportExcel({
      fileName: "transactions",
      rows: mapTransactionToExcel(data.items),
    });
  };
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
            <Button
              sx={{ gap: "6px" }}
              variant="on-surface"
              onClick={handleExport}
              disabled={isExportDisabled}
            >
              <DownloadIcon sx={{ color: "inherit" }} />
              دانلود اکسل
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

type TranactionTypeFilter = TransactionFilters["Type"];
type OrderSideFilter = OrderFilters["orderSide"];

function TransactionFilterControls() {
  const transactionFilters = useTransactionFiltersProvider()!;

  const typeHandler = (type: TranactionTypeFilter) => {
    transactionFilters.setType(type);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
        width: "450px",
      }}
    >
      <InputSelect
        sx={{ flex: 1 }}
        variant="outlined"
        size="small"
        placeholder="نوع تراکنش"
        value={filterToSelectValue(transactionFilters.filters.Type)}
        onChange={(type) =>
          typeHandler(selectValueToFilter(type) as TranactionTypeFilter)
        }
      >
        <InputSelectMenu>
          {TRANSACTION_TYPE_LIST.map(({ value, label }, index) => {
            return [
              index === 0 && !!TRANSACTION_TYPE_LIST.length && (
                <InputSelectItem value={SELECT_FILTER_ALL}>
                  {"همه"}
                </InputSelectItem>
              ),

              <InputSelectItem value={value}>{label}</InputSelectItem>,
            ];
          })}
        </InputSelectMenu>
      </InputSelect>
      {/* From Date */}
      <DateCalanderProvider>
        <DateCalanderTrigger
          value={transactionFilters.filters.fromDate}
          onClear={() => transactionFilters.setFromDate(null)}
          sx={{ flex: 1 }}
        >
          <DateValueDisplay
            value={transactionFilters.filters.fromDate}
            placeholder="از تاریخ"
            onClear={() => transactionFilters.setFromDate(null)}
          />
        </DateCalanderTrigger>

        <DateCalanderMenu>
          <DateCalendarDropdown
            value={transactionFilters.filters.fromDate}
            onChange={(date) => transactionFilters.setFromDate(date)}
          />
        </DateCalanderMenu>
      </DateCalanderProvider>

      {/* To Date */}
      <DateCalanderProvider>
        <DateCalanderTrigger
          value={transactionFilters.filters.toDate}
          onClear={() => transactionFilters.setToDate(null)}
          sx={{ flex: 1 }}
        >
          <DateValueDisplay
            value={transactionFilters.filters.toDate}
            placeholder="تا تاریخ"
            onClear={() => transactionFilters.setToDate(null)}
          />
        </DateCalanderTrigger>

        <DateCalanderMenu>
          <DateCalendarDropdown
            value={transactionFilters.filters.toDate}
            onChange={(date) => transactionFilters.setToDate(date)}
          />
        </DateCalanderMenu>
      </DateCalanderProvider>
    </Box>
  );
}
function OrderFilterControls() {
  const orderFilters = useOrderFiltersProvider()!;

  const symbolsQuery = useQuery(symbolsConfig());

  const symbolHandler = (symbol: string) => {
    orderFilters.setSymbol(selectValueToFilter(symbol));
  };
  const sideHandler = (side: OrderSideFilter) => {
    orderFilters.setSide(side);
  };
  const viewHandler = (isActiveView: boolean) => {
    orderFilters.setView(isActiveView ? "active" : "history");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          width: "700px",
        }}
      >
        {/*  Symbol  */}
        <InputSelect
          size="small"
          variant="outlined"
          color="primary"
          sx={{ flex: 1 }}
          placeholder="نماد"
          //@ts-ignore
          onChange={symbolHandler}
          value={filterToSelectValue(orderFilters.filters.productCode)}
        >
          <InputSelectMenu>
            {symbolsQuery.isLoading && <SelectInputLoader />}

            {!symbolsQuery.isLoading &&
              symbolsQuery.data?.flatMap((symbol, index) => {
                return [
                  index === 0 && !!symbolsQuery.data.length && (
                    <InputSelectItem value={SELECT_FILTER_ALL}>
                      {"همه"}
                    </InputSelectItem>
                  ),
                  <InputSelectItem value={symbol.name}>
                    {symbol.name}
                  </InputSelectItem>,
                ];
              })}
          </InputSelectMenu>
        </InputSelect>

        {/* Order side  */}
        <InputSelect
          placeholder="سمت"
          size="small"
          variant="outlined"
          color="primary"
          sx={{ flex: 1 }}
          //@ts-ignore
          onChange={sideHandler}
          value={filterToSelectValue(orderFilters.filters.orderSide)}
        >
          <InputSelectMenu>
            <InputSelectItem value={SELECT_FILTER_ALL}>{"همه"}</InputSelectItem>
            <InputSelectItem value={"Buy" satisfies OrderSideFilter}>
              {"خرید"}
            </InputSelectItem>
            <InputSelectItem value={"Sell" satisfies OrderSideFilter}>
              {"فروش"}
            </InputSelectItem>
          </InputSelectMenu>
        </InputSelect>

        {/* From Date */}
        <DateCalanderProvider>
          <DateCalanderTrigger
            value={orderFilters.filters.fromDate}
            onClear={() => orderFilters.setFromDate(null)}
            sx={{ flex: 1 }}
          >
            <DateValueDisplay
              value={orderFilters.filters.fromDate}
              placeholder="از تاریخ"
              onClear={() => orderFilters.setFromDate(null)}
            />
          </DateCalanderTrigger>

          <DateCalanderMenu>
            <DateCalendarDropdown
              value={orderFilters.filters.fromDate}
              onChange={(date) => orderFilters.setFromDate(date)}
            />
          </DateCalanderMenu>
        </DateCalanderProvider>

        {/* To Date */}
        <DateCalanderProvider>
          <DateCalanderTrigger
            value={orderFilters.filters.toDate}
            onClear={() => orderFilters.setToDate(null)}
            sx={{ flex: 1 }}
          >
            <DateValueDisplay
              value={orderFilters.filters.toDate}
              placeholder="تا تاریخ"
              onClear={() => orderFilters.setToDate(null)}
            />
          </DateCalanderTrigger>

          <DateCalanderMenu>
            <DateCalendarDropdown
              value={orderFilters.filters.toDate}
              onChange={(date) => orderFilters.setToDate(date)}
            />
          </DateCalanderMenu>
        </DateCalanderProvider>

        {/* order status  */}
        <CheckBox
          variant="outlined"
          label="سفارشات باز"
          checked={orderFilters.filters.view === "active"}
          onChange={(_, checked) => viewHandler(checked)}
        />
      </Box>
    </Box>
  );
}
export { ActivityHistoryProvider, ActivityHistory };
