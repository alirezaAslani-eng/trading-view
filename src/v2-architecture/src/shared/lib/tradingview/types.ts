import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
  TradingTerminalWidgetOptions,
} from "./charting_library/charting_library";

type SymbolChangeHandler = (name: string, info: ChangedSymbolInfo) => void;

type WidgetOptions =
  | ChartingLibraryWidgetOptions
  | TradingTerminalWidgetOptions;

interface ChangedSymbolInfo {
  name: string;
  ticker: string;
  full_name?: string;
  description?: string;
  exchange?: string;
  listed_exchange?: string;

  type: string;

  session?: string;
  timezone?: string;

  minmov?: number;
  pricescale?: number;

  has_intraday?: boolean;
  has_daily?: boolean;

  supported_resolutions?: ResolutionString[];

  volume_precision?: number;

  data_status?: "streaming" | "endofday" | string;

  format?: "price" | string;

  base_name?: string[];
  legs?: string[];

  pro_name?: string;
}

export type { ChangedSymbolInfo, SymbolChangeHandler, WidgetOptions };
