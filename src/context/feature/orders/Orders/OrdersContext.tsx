"use client";
import { createContext, PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import { useOrderFiltersProvider } from "./hooks";
import { ordersConfig } from "@/packages/react-query";
import { OrdersContextValue } from "./types";
import { useTradeMode } from "../../trade/TradeMode";

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

function OrdersProvider({ children }: PropsWithChildren) {
  const {
    filters: { view, ...filters },
  } = useOrderFiltersProvider()!;

  const { isDemo } = useTradeMode();
  const query = useQuery(
    ordersConfig({ ...filters, viewType: view, isdemo: isDemo }),
  );

  return <OrdersContext value={query}>{children}</OrdersContext>;
}

export { OrdersProvider, OrdersContext };
