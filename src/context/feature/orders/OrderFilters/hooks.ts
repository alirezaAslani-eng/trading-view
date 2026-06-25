import { useContext } from "react";
import { OpenOrdersActions } from "./types";
import { OrderFiltersContext } from "./OrderFiltersContext";

function useOrderFilters(): OpenOrdersActions {
  const ctx = useContext(OrderFiltersContext)!;
  return ctx;
}

export { useOrderFilters };
