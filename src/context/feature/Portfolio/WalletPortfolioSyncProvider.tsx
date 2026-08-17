"use client";

import { useEffect } from "react";

// import type { WalletAsset, WalletPortfolioResponse } from "@/api/types";

import {
  onPortfolioUpdate,
  onPriceUpdate,
  onRefreshWallet,
  walletHub,
  type OnPortfolioUpdateInfo,
  type OnPriceUpdateInfo,
} from "@/packages/signalr";

import { queryClient, walletProtfolioKey } from "@/packages/react-query";

async function updatePortfolio(data: OnPortfolioUpdateInfo) {
  walletHub.onTickLog({
    source: "Wallet Portofolio",
    event: onPortfolioUpdate,
  });
  await queryClient.cancelQueries({ queryKey: walletProtfolioKey });
  queryClient.invalidateQueries({ queryKey: walletProtfolioKey });
  // queryClient.setQueryData<WalletPortfolioResponse>(walletProtfolioKey, data);
}

async function updatePrice(data: OnPriceUpdateInfo) {
  walletHub.onTickLog({ source: "Wallet Assets", event: onPriceUpdate });
  await queryClient.cancelQueries({ queryKey: walletProtfolioKey });
  queryClient.invalidateQueries({ queryKey: walletProtfolioKey });

  // queryClient.setQueryData<WalletPortfolioResponse>(
  //   walletProtfolioKey,
  //   (oldData) => {
  //     if (!oldData) return oldData;

  //     const assets: WalletAsset[] = oldData.assets.map((asset) => {
  //       if (asset.assetSymbol !== data.symbol) {
  //         return asset;
  //       }

  //       const totalBalance = asset.availableBalance + asset.lockedBalance;

  //       const totalValueInIrt = totalBalance * data.newPrice;

  //       return {
  //         ...asset,
  //         livePrice: data.newPrice,
  //         totalValueInIrt,
  //       };
  //     });

  //     const totalPortfolioValueIrt = assets.reduce(
  //       (sum, asset) => sum + asset.totalValueInIrt,
  //       0,
  //     );

  //     return {
  //       ...oldData,
  //       assets,
  //       totalPortfolioValueIrt,
  //     };
  //   },
  // );
}

async function refreshPortfolio() {
  walletHub.onTickLog({
    source: "Wallet Refresh",
    event: onRefreshWallet,
  });
  await queryClient.cancelQueries({ queryKey: walletProtfolioKey });
  queryClient.invalidateQueries({ queryKey: walletProtfolioKey });
}

function WalletSyncProvider() {
  useEffect(() => {
    const con = walletHub.build();

    walletHub.start(con);
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
