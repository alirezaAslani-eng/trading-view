"use client";
import { createContext, PropsWithChildren, useContext } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useOrderFilters } from "@/context/feature/orders/OrderFilters/hooks";
import { activeOrdersConfig } from "@/packages/react-query";
import { UserOrdersResponse } from "@/api/types";
import { ResponseErrorType } from "@/types";

const ActiveOrdersContext = createContext(
  {} as UseQueryResult<UserOrdersResponse, ResponseErrorType>,
);

export function ActiveOrdersProvider({ children }: PropsWithChildren) {
  const orderFilters = useOrderFilters();

  const query = useQuery(activeOrdersConfig(orderFilters.filters));

  return <ActiveOrdersContext value={query}>{children}</ActiveOrdersContext>;
}

export function useActiveOrders() {
  return useContext(ActiveOrdersContext);
}
