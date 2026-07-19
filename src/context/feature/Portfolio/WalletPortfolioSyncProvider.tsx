"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import type { WalletAsset, WalletPortfolioResponse } from "@/api/types";

import {
  onPortfolioUpdate,
  onPriceUpdate,
  walletHub,
  type OnPortfolioUpdateInfo,
  type OnPriceUpdateInfo,
} from "@/packages/signalr";

import {
  queryClient,
  walletPortfolioConfig,
  walletProtfolioKey,
} from "@/packages/react-query";

function updatePortfolio(data: OnPortfolioUpdateInfo) {
  queryClient.setQueryData<WalletPortfolioResponse>(walletProtfolioKey, data);
}

function updatePrice(data: OnPriceUpdateInfo) {
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
        0,
      );

      return {
        ...oldData,
        assets,
        totalPortfolioValueIrt,
      };
    },
  );
}

function WalletSyncProvider() {
  const { isSuccess } = useQuery(walletPortfolioConfig());

  useEffect(() => {
    if (!isSuccess) return;

    const con = walletHub.build();

    con.on(onPortfolioUpdate, updatePortfolio);
    con.on(onPriceUpdate, updatePrice);

    return () => {
      con.off(onPortfolioUpdate, updatePortfolio);
      con.off(onPriceUpdate, updatePrice);
    };
  }, [isSuccess]);

  return null;
}

export default WalletSyncProvider;
