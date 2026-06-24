import { UserOrderFilters } from "@/types";
import { ReactNode } from "react";
/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type OrderFiltersFilters = UserOrderFilters;
type OrderFiltersActions = {
  resetFilters: () => void;
  updateFilter: <K extends keyof OrderFiltersFilters>(
    key: K,
    value: OrderFiltersFilters[K],
  ) => void;
};

interface OrderFiltersContextValue extends OrderFiltersActions {
  filters: OrderFiltersFilters;
}

/* -------------------------------------------------------------------------- */
/*                                 Provider                                   */
/* -------------------------------------------------------------------------- */
type OrderFiltersProviderProps = {
  children: ReactNode;
};

export type {
  OrderFiltersActions,
  OrderFiltersFilters,
  OrderFiltersContextValue,
  OrderFiltersProviderProps,
};
