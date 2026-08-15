"use client";
import { createContext, PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import { transactionsConfig } from "@/packages/react-query";
import { useTransactionFiltersProvider } from "./hooks";
import { TransactionsContextValue } from "./types";
import { useTradeMode } from "../../trade/TradeMode";

const TransactionContext = createContext<TransactionsContextValue | undefined>(
  undefined,
);

function TransactionsProvider({ children }: PropsWithChildren) {
  const transactionFilters = useTransactionFiltersProvider()!;
  const { isDemo } = useTradeMode();
  const query = useQuery(
    transactionsConfig({ ...transactionFilters.filters, isdemo: isDemo }),
  );

  return <TransactionContext value={query}>{children}</TransactionContext>;
}

export { TransactionsProvider, TransactionContext };
