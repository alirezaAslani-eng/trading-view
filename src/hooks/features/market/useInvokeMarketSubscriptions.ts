import { useEffect } from "react";
import {
  getConnection,
  start,
  SubscribeToMarket,
} from "@/packages/signalr";

function useInvokeMarketSubscriptions(symbols: string[]) {

  
  useEffect(() => {
    const con = getConnection()!;
    async function init() {
      await start(con);

      symbols.forEach((symbol) => {
        con.invoke(
          SubscribeToMarket,
          symbol,
        );
      });
    }

    init();
  }, [symbols]);
}

export default useInvokeMarketSubscriptions;