import { useEffect } from "react";
import {
  getConnection,
  start,
  subscribeToMarket,
} from "@/packages/signalr";

function useInvokeMarketSubscriptions(symbols: string[]) {

  
  useEffect(() => {
    const con = getConnection()!;
    async function init() {
      await start(con);

      symbols.forEach((symbol) => {
        con.invoke(
          subscribeToMarket,
          symbol,
        );
      });
    }

    init();
  }, [symbols]);
}

export default useInvokeMarketSubscriptions;