import { ROUTES } from "@/constant/app/routes";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

function useSymbolParams(): [string, (symbol: string) => void] {
  const params = useParams();
  const symbol = params.symbol as string;

  const { push } = useRouter();

  const setSymbolParam = useCallback((symbol: string) => {
    push(ROUTES.TRADE.BY_SYMBOL(symbol));
  }, []);

  return [symbol, setSymbolParam];
}

export default useSymbolParams;
