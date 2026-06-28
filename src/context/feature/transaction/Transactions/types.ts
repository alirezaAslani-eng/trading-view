import { TransactionsResponse } from "@/api/types";
import { UseTransactionFiltersReturn } from "@/hooks/features/transaction/types";
import { TransactionFilters } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

interface TransactionFiltersProviderProps extends PropsWithChildren {
  initialFilters?: Partial<TransactionFilters>;
}
interface TransactionFiltersContextValue extends UseTransactionFiltersReturn {}

type TransactionsContextValue = UseQueryResult<TransactionsResponse>;

export type {
  TransactionFiltersProviderProps,
  TransactionFiltersContextValue,
  TransactionsContextValue,
};
