"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { symbolsConfig } from "@/packages/react-query";
import { getConnection, start, subscribeToMarket } from "@/packages/signalr";

function useSubscribeMarket() {
  const { data, isSuccess } = useQuery(symbolsConfig());

  useEffect(() => {
    
    const con = getConnection()!;

    async function init() {
      if (!isSuccess || !data) return;
      try {
        await start(con);

        data.forEach((item) => {
          con.invoke(subscribeToMarket, item.ticker);
        });
      } catch (error) {
        console.error(error);
      }
    }

    init();
  }, [data, isSuccess]);
}

function MarketSubscribeProvider() {
  useSubscribeMarket();

  return null;
}

export default MarketSubscribeProvider;
