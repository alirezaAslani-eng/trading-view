import { ReactNode } from "react";
/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type OpenOrdersFilters = {
  search: string;
  symbol: string | null;
  orderType: "market" | "limit" | null;
  side: "buy" | "sell" | null;
  onlyOpenOrders: boolean;
  sort: "ASC" | "DESC" | null;
};

type OpenOrdersActions = {
  resetFilters: () => void;
  updateFilter: <K extends keyof OpenOrdersFilters>(
    key: K,
    value: OpenOrdersFilters[K],
  ) => void;
};

interface OpenOrdersContextValue extends OpenOrdersActions {
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
  OpenOrdersContextValue,
  OpenOrdersProviderProps,
};
