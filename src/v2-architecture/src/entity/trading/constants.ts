import { TradeContractStatus } from "./types";

export const TRADE_CONTRACT_STATUS = {
  canceled: "Canceled",
  settled: "Settled",
  pending: "Pending",
} satisfies Record<string, TradeContractStatus>;

export const TRADE_CONTRACT_STATUS_LABELS = {
  Canceled: "لغو شده",
  Settled: "تسویه شده",
  Pending: "در انتظار تسویه",
} satisfies Record<TradeContractStatus, string>;
