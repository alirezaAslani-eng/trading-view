import { TRADE_CONTRACT_STATUS } from "./constants";
import { TradeContractStatus } from "./types";

export function getTradeContractStatusFlags(status: TradeContractStatus) {
  return {
    isCanceled: status === TRADE_CONTRACT_STATUS.canceled,
    isSettled: status === TRADE_CONTRACT_STATUS.settled,
    isPending: status === TRADE_CONTRACT_STATUS.pending,
  };
}
