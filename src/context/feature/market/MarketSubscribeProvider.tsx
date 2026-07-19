"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { symbolsConfig } from "@/packages/react-query";
import { marketHub, start, subscribeToMarket } from "@/packages/signalr";

function useSubscribeMarket() {
  const { data, isSuccess } = useQuery(symbolsConfig());

  useEffect(() => {
    const con = marketHub.build();

    async function init() {
      if (!isSuccess) return;

      marketHub.start(con).then(() => {
        data.forEach((item) => {
          con.invoke(subscribeToMarket, item.ticker);
        });
      });
    }

    init();
  }, [data, isSuccess]);
}

function MarketSubscribeProvider() {
  useSubscribeMarket();

  return null;
}

export default MarketSubscribeProvider;
