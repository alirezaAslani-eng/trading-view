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
  const {
    filters: { Type, fromDate, page, pageSize, toDate },
  } = useTransactionFiltersProvider()!;
  const { isDemo } = useTradeMode();

  //#region // * ------------ Something ------------
  //#endregion // * ------------ Something ------------
  const query = useQuery(
    transactionsConfig({
      fromDate,
      isdemo: isDemo,
      page,
      pageSize,
      toDate,
      Type,
    }),
  );

  return <TransactionContext value={query}>{children}</TransactionContext>;
}

export { TransactionsProvider, TransactionContext };
