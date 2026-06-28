import { TransactionStatus } from "@/constant/features/transaction/transactionStatus";
import { TransactionType } from "@/constant/features/transaction/transactionType";
import { PaginationResponse, WithID } from "@/types";

// * --start-- transactions.ts ---
interface Transaction extends WithID {
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  referenceId: string;
  createdAt: string;
}
type TransactionsResponse = PaginationResponse<Transaction[]>;
// * --end-- transactions.ts ---

export type { TransactionsResponse, Transaction };
