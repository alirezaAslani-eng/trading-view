import { UserOrderFilters } from "@/types";
import { ReactNode } from "react";
/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type OpenOrdersFilters = UserOrderFilters;
type OpenOrdersActions = {
  resetFilters: () => void;
  updateFilter: <K extends keyof OpenOrdersFilters>(
    key: K,
    value: OpenOrdersFilters[K],
  ) => void;
};

interface OrderFiltersContextValue extends OpenOrdersActions {
  filters: OpenOrdersFilters;
}

/* -------------------------------------------------------------------------- */
/*                                 Provider                                   */
/* -------------------------------------------------------------------------- */
type OpenOrdersProviderProps = {
  children: ReactNode;
};

export type {
  OpenOrdersActions,
  OpenOrdersFilters,
  OrderFiltersContextValue,
  OpenOrdersProviderProps,
};
