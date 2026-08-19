export type TradeContractStatus = "Canceled" | "Settled" | "Pending";

export interface TradeContract {
  id: string;
  buyerId: string;
  sellerId: string;
  productCode: string;
  matchPrice: number;
  matchWeight: number;
  totalValue: number;
  depositPaid: number;
  remaningDebt: number;
  penaltyAmount: number;
  createdAt: string;
  remaningDate: number;
  status: TradeContractStatus;
}
