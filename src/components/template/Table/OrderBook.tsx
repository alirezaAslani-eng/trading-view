"use client";
import { OrderBookType } from "@/api/types";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { TradeOrderIcon } from "@/components/ui/Icon";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import ScrollContainer from "@/components/ui/ScrollContainer/ScrollContainer";
import Tabs from "@/components/ui/Tabs/Tabs";
import TabsSibling from "@/components/ui/Tabs/TabsSibling";
import { TabsProvider } from "@/context/app/TabsContext";
import useSymbolParams from "@/hooks/features/trading/useSymbolParams";
import { notDefinedColors } from "@/packages/mui/theme/shades";
import {
  marketTickerInfoConfig,
  orderBookConfig,
} from "@/packages/react-query";
import { formatFaPrice } from "@/utils";
import { Box, Stack, Tab, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import OrderBookIcon from "../Trade/OrderBookIcon";

type OrderBookListProps = {
  rows: OrderBookType[];
  priceColor: string;
};

const GRID_TEMPLATE = "1fr 1fr";

const TABS = [
  { value: "open-orders", label: "سفارشات بازار" },
  { value: "last-trades", label: "آخرین معاملات" },
];

type OrderBookViewType = "asks" | "bids" | "all";
const orderBookViewOrder: Record<OrderBookViewType, OrderBookViewType> = {
  all: "asks",
  asks: "bids",
  bids: "all",
};
export default function OrderBook() {
  const [symbol] = useSymbolParams();

  const [orderBookView, setOrderBookView] = useState<OrderBookViewType>("all");

  const orderBookQuery = useQuery(orderBookConfig(symbol));
  const tickerInfoQuery = useQuery(marketTickerInfoConfig(symbol));

  const orderBookViewToggle = () => {
    setOrderBookView((prev) => {
      return orderBookViewOrder[prev];
    });
  };
  return (
    <PanelPaper
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "4px 10px 20px 10px",
        width: "100%",
        maxWidth: "270px",
        height: "100%",
      }}
    >
      {/* Tabs (fixed height) */}
      <TabsProvider defaultState="open-orders">
        <Box sx={{ display: "flex" }}>
          <Tabs size="small" sx={{ width: "100%" }}>
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                sx={({ typography }) => ({
                  fontSize: `${typography.button3.fontSize} !important`,
                  fontFamily: `${typography.button3.fontFamily} !important`,
                })}
              />
            ))}
          </Tabs>
          <TabsSibling>
            <OrderBookIcon
              view={orderBookView}
              sx={{ cursor: "pointer" }}
              onClick={orderBookViewToggle}
            />
          </TabsSibling>
        </Box>
      </TabsProvider>
      <OrderBookHeader />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          mt: "12px",
        }}
      >
        {/* // * --------- Data fallback --------- */}
        <FallbackHandler
          isLoading={orderBookQuery.isLoading}
          isError={orderBookQuery.isError}
          fallbacks={{
            loader: (
              <BouncCircleLoader
                sx={{ mx: "auto", my: "auto" }}
                bounceSx={{ width: "8px" }}
              />
            ),
          }}
        />

        {orderBookQuery.status === "success" && (
          <>
            {/* // * ----------- Asks ----------- */}
            {(orderBookView === "all" || orderBookView === "asks") && (
              <OrderBookList
                rows={orderBookQuery.data.asks}
                priceColor={notDefinedColors["#f26672"]}
              />
            )}

            {orderBookView === "all" && (
              <Typography
                variant="button3"
                sx={{
                  py: "12px",
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                {formatFaPrice(tickerInfoQuery.data?.lastPrice ?? "")}
              </Typography>
            )}

            {/* // * ----------- Bids ----------- */}
            {(orderBookView === "all" || orderBookView === "bids") && (
              <OrderBookList
                rows={orderBookQuery.data.bids}
                priceColor="text.profit"
              />
            )}
          </>
        )}
      </Box>
    </PanelPaper>
  );
}

function OrderBookHeader() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: GRID_TEMPLATE,
        py: "10px",
        mt: "12px",
        borderBottom: "1px solid",
        borderColor: "border.dark",
      }}
    >
      <Typography
        variant="caption2"
        sx={{ textAlign: "right", color: "text.caption" }}
      >
        قیمت (IRT)
      </Typography>

      <Typography
        variant="caption2"
        sx={{ textAlign: "left", color: "text.caption" }}
      >
        حجم (IRT)
      </Typography>
    </Box>
  );
}

function OrderBookRowItem({
  priceColor,
  price,
  volumn,
}: {
  priceColor: string;
  price: number | string;
  volumn: string | number;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: GRID_TEMPLATE,
      }}
    >
      <Typography
        variant="caption2"
        sx={{ textAlign: "right", color: priceColor }}
      >
        {formatFaPrice(price ?? "")}
      </Typography>

      <Typography
        variant="caption2"
        sx={{ textAlign: "left", color: "text.secondary" }}
      >
        {formatFaPrice(volumn ?? "")}
      </Typography>
    </Box>
  );
}

function OrderBookList({ rows, priceColor }: OrderBookListProps) {
  return (
    <ScrollContainer
      sx={{
        scrollbarGutter: "stable",
        pl: "8px",
        maxHeight: "180px",
      }}
    >
      {!!!rows.length && (
        <Stack
          sx={{
            height: "180px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body3" sx={{ color: "text.disabled" }}>
            {"سفارش وجود ندارد"}
          </Typography>
        </Stack>
      )}
      {!!rows.length && (
        <Stack spacing={2}>
          {rows.map((row, index) => (
            <OrderBookRowItem
              key={`${priceColor}-${index}`}
              price={row[0]}
              volumn={row[1]}
              priceColor={priceColor}
            />
          ))}
        </Stack>
      )}
    </ScrollContainer>
  );
}
