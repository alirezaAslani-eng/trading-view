"use client";
import { createContext, PropsWithChildren, useContext } from "react";
import { OrderFiltersContextValue, OrderFiltersProviderProps } from "./types";
import useOrderFilters from "@/hooks/features/order/useOrderFilters";

const OrderFiltersContext = createContext<OrderFiltersContextValue | undefined>(
  undefined,
);

function OrderFiltersProvider({
  children,
  defaultFilters,
}: PropsWithChildren<OrderFiltersProviderProps>) {
  const filters = useOrderFilters(defaultFilters);

  return <OrderFiltersContext value={filters}>{children}</OrderFiltersContext>;
}

export { OrderFiltersContext, OrderFiltersProvider };
