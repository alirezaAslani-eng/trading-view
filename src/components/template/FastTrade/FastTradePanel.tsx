"use client";

import FastTradeAssetSidebar from "@/components/template/FastTrade/FastTradeAssetSidebar";
import FastTradeForm from "@/components/template/Form/FastTradeForm";
import { fastTradeAssets } from "@/components/template/FastTrade/fastTradeAssets";
import { PagePaper } from "@/components/ui/Layout/PaperLayout";
import { Box } from "@mui/material";
import { useState } from "react";

function FastTradePanel() {
  const [selectedAssetId, setSelectedAssetId] = useState(fastTradeAssets[0].id);
  const [orderSide, setOrderSide] = useState<"buy" | "sell">("buy");

  return (
    <PagePaper
      sx={{
        display: "flex",
        alignItems: "stretch",
        direction: "rtl",
        gap: "48px",
        p: 0,
        pt: "48px",
        pb: "48px",
        minHeight: "480px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "346px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          p: "12px 10px 20px",
          mr: "48px",
        }}
      >
        <FastTradeAssetSidebar
          selectedAssetId={selectedAssetId}
          onSelectAsset={setSelectedAssetId}
          orderSide={orderSide}
          onOrderSideChange={setOrderSide}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          p: "20px 16px",
          display: "flex",
          flexDirection: "column",
          border: ({ palette }) => `1px solid ${palette.border.default}`,
          borderRadius: "16px",
          ml: "48px",
        }}
      >
        <FastTradeForm
          orderSide={orderSide}
          selectedAssetId={selectedAssetId}
          onSelectAsset={setSelectedAssetId}
        />
      </Box>
    </PagePaper>
  );
}

export default FastTradePanel;
