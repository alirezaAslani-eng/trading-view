interface BankAccount {
  id: number;
  bankName: string;
  iban: string;
  cardNumber: string;
  isVerified: boolean;
  createdAt: string;
}

type BankAccountsResponse = BankAccount[];

export type { BankAccount, BankAccountsResponse };
