"use client";

import { useEffect } from "react";

import type { WalletAsset, WalletPortfolioResponse } from "@/api/types";

import {
  onPortfolioUpdate,
  onPriceUpdate,
  walletHub,
  type OnPortfolioUpdateInfo,
  type OnPriceUpdateInfo,
} from "@/packages/signalr";

import { queryClient, walletProtfolioKey } from "@/packages/react-query";

function updatePortfolio(data: OnPortfolioUpdateInfo) {
  walletHub.onTickLog({
    source: "Wallet Portofolio",
    event: onPortfolioUpdate,
  });

  queryClient.setQueryData<WalletPortfolioResponse>(walletProtfolioKey, data);
}

function updatePrice(data: OnPriceUpdateInfo) {
  walletHub.onTickLog({ source: "Wallet Assets", event: onPriceUpdate });
  queryClient.setQueryData<WalletPortfolioResponse>(
    walletProtfolioKey,
    (oldData) => {
      if (!oldData) return oldData;

      const assets: WalletAsset[] = oldData.assets.map((asset) => {
        if (asset.assetSymbol !== data.symbol) {
          return asset;
        }

        const totalBalance = asset.availableBalance + asset.lockedBalance;

        const totalValueInIrt = totalBalance * data.newPrice;

        return {
          ...asset,
          livePrice: data.newPrice,
          totalValueInIrt,
        };
      });

      const totalPortfolioValueIrt = assets.reduce(
        (sum, asset) => sum + asset.totalValueInIrt,
        0
      );

      return {
        ...oldData,
        assets,
        totalPortfolioValueIrt,
      };
    }
  );
}

function WalletSyncProvider() {
  useEffect(() => {
    const con = walletHub.build();

    walletHub.start(con);
    con.on(onPortfolioUpdate, updatePortfolio);
    con.on(onPriceUpdate, updatePrice);

    return () => {
      con.off(onPortfolioUpdate, updatePortfolio);
      con.off(onPriceUpdate, updatePrice);
    };
  }, []);

  return null;
}

export default WalletSyncProvider;
