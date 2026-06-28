import { useContext } from "react";
import { TransactionFiltersContext } from "./TransactionFiltersContext";
import { TransactionContext } from "./TransactionsContext";

export function useTransactionFiltersProvider() {
  return useContext(TransactionFiltersContext);
}

export function useTransactions() {
  return useContext(TransactionContext);
}
