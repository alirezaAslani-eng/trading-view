import { useContext, useMemo } from "react";
import { OrderActions, OrderFilters } from "./types";
import { OpenOrderFiltersContext } from "./OrderFiltersContext";

function useOpenOrderActions(): OrderActions {
  const ctx = useContext(OpenOrderFiltersContext)!;

  return useMemo(() => {
    return {
      updateFilter: ctx.resetFilters,
      resetFilters: ctx.resetFilters,
    };
  }, [ctx.resetFilters, ctx.updateFilter]);
}

function useOpenOrderFilters(): OrderFilters {
  const ctx = useContext(OpenOrderFiltersContext)!;
  return ctx.filters;
}

export { useOpenOrderActions, useOpenOrderFilters };
