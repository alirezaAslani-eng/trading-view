import { ReactNode } from "react";
/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type OrderFilters = {
  search: string;
  symbol: string | null;
  orderType: "market" | "limit" | null;
  side: "buy" | "sell" | null;
  onlyOpenOrders: boolean;
  sort: "ASC" | "DESC" | null;
};

type OrderActions = {
  resetFilters: () => void;
  updateFilter: <K extends keyof OrderFilters>(
    key: K,
    value: OrderFilters[K],
  ) => void;
};

interface OrderFiltersContextValue extends OrderActions {
  filters: OrderFilters;
}

/* -------------------------------------------------------------------------- */
/*                                 Provider                                   */
/* -------------------------------------------------------------------------- */
type OrderFiltersProviderProps = {
  children: ReactNode;
};

export type {
  OrderActions,
  OrderFilters,
  OrderFiltersContextValue,
  OrderFiltersProviderProps,
};
