"use client";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import { PropsWithChildren } from "react";
import tradeFormSchema from "@/validations/trade/tradeFormSchema";
import {
  TradeFormSchemaInputType,
  TradeFormSchemaOutputType,
} from "@/validations/types";

export function TradeFormProvider({ children }: PropsWithChildren) {
  const [symbol] = useSymbolParams();

  const form = useForm({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      orderSide: "buy",
      orderType: "market",
      productCode: symbol,
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}

export const useTradeForm = useFormContext<
  TradeFormSchemaInputType,
  unknown,
  TradeFormSchemaOutputType
>;
