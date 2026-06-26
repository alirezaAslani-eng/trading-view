"use client";
import { createContext, PropsWithChildren, useContext } from "react";
import { OrderFilters } from "@/types";
import { useCallback, useState } from "react";
import { OrderFiltersContextValue, OrderFiltersProviderProps } from "./types";

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

// * ------------ State Logic ------------
function useOrderFilters(initialState: OrderFilters): OrderFiltersContextValue {
  /**
   * filter state.
   */
  const [filters, setFilters] = useState<OrderFilters>(initialState);

  /**
   * Update a single filter field.
   */
  const setFilter = useCallback(
    <K extends keyof OrderFilters>(key: K, value: OrderFilters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  /**
   * Reset all filters to their initial state.
   */
  const resetFilters = useCallback(() => {
    setFilters(initialState);
  }, [initialState]);

  return {
    filters,
    setFilter,
    resetFilters,
  };
}
