import { createContext } from "react";
import useTransactionFilters from "@/hooks/features/transaction/useTransactionFilters";
import {
  TransactionFiltersContextValue,
  TransactionFiltersProviderProps,
} from "./types";

const TransactionFiltersContext = createContext<
  TransactionFiltersContextValue | undefined
>(undefined);

function TransactionFiltersProvider({
  children,
  initialFilters,
}: TransactionFiltersProviderProps) {
  const value = useTransactionFilters(initialFilters);

  return (
    <TransactionFiltersContext.Provider value={value}>
      {children}
    </TransactionFiltersContext.Provider>
  );
}

export { TransactionFiltersContext, TransactionFiltersProvider };
