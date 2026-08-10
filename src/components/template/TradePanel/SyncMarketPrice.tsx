import { marketTickerInfoConfig } from "@/packages/react-query";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useTradeForm } from "./TradeFormContext";

// * A logical component just to localise the re-render and update `marketPrice` field
function SyncMarketPrice() {
  const form = useTradeForm();
  const productCode = useWatch({ control: form.control, name: "productCode" });

  const query = useQuery(marketTickerInfoConfig(productCode));
  const lastPrice = query.data?.lastPrice;
  useEffect(() => {
    if (lastPrice === undefined) return;
    form.setValue("marketPrice", Number(lastPrice));
  }, [lastPrice]);
  return undefined;
}

export default SyncMarketPrice;
