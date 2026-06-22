// * ========== Listener calback types ===========
type OnTradeExecutedInfo = Record<"price" | "volum" | "time", number> & {
  productCode: string;
};

export type { OnTradeExecutedInfo };
