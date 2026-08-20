"use client";

import { useEffect } from "react";
import { queryClient, walletProtfolioKey } from "@/packages/react-query";
import { signalRLog } from "@/packages/signalr/helpers";
import {
  onPortfolioUpdate,
  onPriceUpdate,
  onRefreshWallet,
  walletHub,
  type OnPortfolioUpdateInfo,
  type OnPriceUpdateInfo,
} from "@/packages/signalr";

async function updatePortfolio(data: OnPortfolioUpdateInfo) {
  await queryClient.cancelQueries({
    queryKey: walletProtfolioKey,
  });

  queryClient.invalidateQueries({
    queryKey: walletProtfolioKey,
  });

  signalRLog("wallet", "CACHE_INVALIDATED", {
    listener: onPortfolioUpdate,
    target_cache: walletProtfolioKey,
  });
}

async function updatePrice(data: OnPriceUpdateInfo) {
  await queryClient.cancelQueries({
    queryKey: walletProtfolioKey,
  });

  queryClient.invalidateQueries({
    queryKey: walletProtfolioKey,
  });
  signalRLog("wallet", "CACHE_INVALIDATED", {
    listener: onPriceUpdate,
    target_cache: walletProtfolioKey,
  });
}

async function refreshPortfolio() {
  await queryClient.cancelQueries({
    queryKey: walletProtfolioKey,
  });

  queryClient.invalidateQueries({
    queryKey: walletProtfolioKey,
  });
  signalRLog("wallet", "CACHE_INVALIDATED", {
    listener: onRefreshWallet,
    target_cache: walletProtfolioKey,
  });
}

function WalletSyncProvider() {
  useEffect(() => {
    const con = walletHub.build();

    walletHub
      .start(con)
      .then(() => {
        signalRLog("wallet", "CONNECTION_STARTED");
      })
      .catch((err) => {
        signalRLog("wallet", "CONNECTION_FAILED", err);
      });

    con.on(onPortfolioUpdate, updatePortfolio);
    con.on(onPriceUpdate, updatePrice);
    con.on(onRefreshWallet, refreshPortfolio);

    return () => {
      con.off(onPortfolioUpdate, updatePortfolio);
      con.off(onPriceUpdate, updatePrice);
      con.off(onRefreshWallet, refreshPortfolio);
    };
  }, []);

  return null;
}

export default WalletSyncProvider;
