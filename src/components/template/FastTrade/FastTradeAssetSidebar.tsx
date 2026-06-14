"use client";

import { SearchIcon } from "@/components/ui/Icon";
import InputText from "@/components/ui/Input/InputText";
import InputMarker from "@/components/ui/Marker/InputMarker";
import ScrollContainer from "@/components/ui/ScrollContainer/ScrollContainer";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import tradeTogglebuttonSell_sx from "@/packages/mui/theme/shared-style/features/trading/tradeTogglebuttonSell_sx";
import { formatFaPrice } from "@/utils";
import { Box, ButtonBase, Stack, ToggleButton, Typography } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { fastTradeAssets, type FastTradeAsset } from "./fastTradeAssets";

type FastTradeAssetSidebarProps = {
  selectedAssetId: string;
  onSelectAsset: (assetId: string) => void;
  orderSide: "buy" | "sell";
  onOrderSideChange: (side: "buy" | "sell") => void;
};

function FastTradeAssetSidebar({
  selectedAssetId,
  onSelectAsset,
  orderSide,
  onOrderSideChange,
}: FastTradeAssetSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredAssets = useMemo(() => {
    const query = search.trim();
    if (!query) return fastTradeAssets;
    return fastTradeAssets.filter((asset) => asset.name.includes(query));
  }, [search]);

  return (
    <Stack sx={{ flex: 1, minHeight: 0, gap: "12px" }}>
      <ToggleButtonGroup
        value={orderSide}
        onChange={(_, value) => {
          if (value) onOrderSideChange(value);
        }}
        size="large"
        fullWidth
      >
        <ToggleButton value="buy">{"خرید"}</ToggleButton>
        <ToggleButton value="sell" sx={tradeTogglebuttonSell_sx}>
          {"فروش"}
        </ToggleButton>
      </ToggleButtonGroup>

      <InputMarker
        right="10px"
        icon={<SearchIcon fontSize="medium" sx={{ color: "text.caption" }} />}
      >
        <InputText
          size="small"
          placeholder="جستجو..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          sx={{ width: "100%", pr: "32px", direction: "rtl", textAlign: "right" }}
        />
      </InputMarker>

      <ScrollContainer
        sx={{
          flex: 1,
          minHeight: 0,
          scrollbarGutter: "stable",
          pl: "4px",
        }}
      >
        <Stack spacing={1}>
          {filteredAssets.map((asset) => (
            <AssetListItem
              key={asset.id}
              asset={asset}
              selected={asset.id === selectedAssetId}
              onSelect={() => onSelectAsset(asset.id)}
            />
          ))}
        </Stack>
      </ScrollContainer>
    </Stack>
  );
}

function AssetListItem({
  asset,
  selected,
  onSelect,
}: {
  asset: FastTradeAsset;
  selected: boolean;
  onSelect: () => void;
}) {
  const isPositive = asset.change24h >= 0;

  return (
    <ButtonBase
      onClick={onSelect}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        p: "10px 8px",
        borderRadius: "12px",
        backgroundColor: selected ? "background.surfaceLevel5" : "transparent",
        textAlign: "right",
      }}
    >
      <Typography variant="button3" sx={{ color: "text.onPrimary" }}>
        {asset.name}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Typography
          variant="caption2"
          sx={{ color: isPositive ? "status.profit" : "status.loss" }}
        >
          {`${isPositive ? "+" : ""}${asset.change24h.toLocaleString("fa-IR")}٪`}
        </Typography>
        <Price sx={{ gap: "4px" }}>
          <PriceAmount variant="caption2">{formatFaPrice(asset.price)}</PriceAmount>
          <PriceUnit variant="caption2" />
        </Price>
      </Box>
    </ButtonBase>
  );
}

export default FastTradeAssetSidebar;
