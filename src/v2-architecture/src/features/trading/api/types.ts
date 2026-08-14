import { QueryParams } from "@/utils/app/toQueryParams";

export type TradeModeQueries = QueryParams<{
  isdemo?: boolean;
}>;

export type TradeModeVariables = {
  isDemo: boolean;
};

export type SettlementModeQueries = QueryParams<{
  settlementMode?: boolean;
}>;

export type SettlementModeVariables = {
  settlementMode: boolean;
};
