import {
  TradeFormSchemaInputType,
  TradeFormSchemaOutputType,
} from "@/validations/types";
import { Control } from "react-hook-form";

interface TradeFormSubscriber {
  control: Control<
    TradeFormSchemaInputType,
    unknown,
    TradeFormSchemaOutputType
  >;
}

export type { TradeFormSubscriber };
