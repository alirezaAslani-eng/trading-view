import { getConnection, start, subscribeToMarket } from "@/packages/signalr";
import { useEffect } from "react";

function useInvokeTickerInfo(symbol: string) {
  useEffect(() => {
    const con = getConnection()!;
    start(con).then(() => {
      con.invoke(subscribeToMarket, symbol);
      console.log(subscribeToMarket, symbol);
    });
  }, [symbol]);
}

export default useInvokeTickerInfo;
