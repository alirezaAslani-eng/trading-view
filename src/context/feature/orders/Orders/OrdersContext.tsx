"use client";
import { createContext, PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import { useOrderFilters } from "./hooks";
import { ordersConfig } from "@/packages/react-query";
import { OrdersContextValue } from "./types";

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

function OrdersProvider({ children }: PropsWithChildren) {
  const orderFilters = useOrderFilters()!;

  const query = useQuery(ordersConfig(orderFilters.filters));

  return <OrdersContext value={query}>{children}</OrdersContext>;
}

export { OrdersProvider, OrdersContext };
