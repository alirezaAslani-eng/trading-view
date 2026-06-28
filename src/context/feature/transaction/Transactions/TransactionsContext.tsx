"use client";
import { createContext, PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import { transactionsConfig } from "@/packages/react-query";
import { useTransactionFiltersProvider } from "./hooks";
import { TransactionsContextValue } from "./types";

const TransactionContext = createContext<TransactionsContextValue | undefined>(
  undefined,
);

function TransactionsProvider({ children }: PropsWithChildren) {
  const transactionFilters = useTransactionFiltersProvider()!;

  const query = useQuery(transactionsConfig(transactionFilters.filters));

  return <TransactionContext value={query}>{children}</TransactionContext>;
}

export { TransactionsProvider, TransactionContext };
