"use client";
import { TradeOrderIcon } from "@/components/ui/Icon";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import ScrollContainer from "@/components/ui/ScrollContainer/ScrollContainer";
import Tabs from "@/components/ui/Tabs/Tabs";
import { TabsProvider } from "@/context/app/TabsContext";
import { formatFaPrice } from "@/utils";
import { Box, Stack, Tab, Typography } from "@mui/material";

type OrderBookRow = {
  price: string;
  amount: string;
  total: string;
};

type OrderBookListProps = {
  rows: OrderBookRow[];
  priceColor: string;
};

const GRID_TEMPLATE = "1fr 1fr 1fr";

const TABS = [
  { value: "open-orders", label: "سفارشات بازار" },
  { value: "last-trades", label: "آخرین معاملات" },
];

const SAMPLE_SELL_ORDERS: OrderBookRow[] = [
  { price: "28,700", amount: "2,000", total: "2,000,350" },
  { price: "28,400", amount: "5,000", total: "2,040,350" },
  { price: "28,325", amount: "3,000", total: "2,040,350" },
  { price: "28,325", amount: "5,000", total: "3,041,244" },
  { price: "28,700", amount: "2,000", total: "2,000,350" },
  { price: "28,400", amount: "5,000", total: "2,040,350" },
];

const SAMPLE_BUY_ORDERS: OrderBookRow[] = [
  { price: "28,700", amount: "2,000", total: "2,000,350" },
  { price: "28,400", amount: "5,000", total: "2,040,350" },
  { price: "28,325", amount: "3,000", total: "2,040,350" },
  { price: "28,700", amount: "2,000", total: "2,000,350" },
  { price: "28,400", amount: "5,000", total: "2,040,350" },
  { price: "28,325", amount: "3,000", total: "2,040,350" },
  { price: "28,325", amount: "5,000", total: "3,041,244" },
];

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
        sx={{ textAlign: "center", color: "text.caption" }}
      >
        مقدار (kg)
      </Typography>
      <Typography
        variant="caption2"
        sx={{ textAlign: "left", color: "text.caption" }}
      >
        مجموع (IRT)
      </Typography>
    </Box>
  );
}

function OrderBookRowItem({
  price,
  amount,
  total,
  priceColor,
}: OrderBookRow & { priceColor: string }) {
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
        {price}
      </Typography>
      <Typography
        variant="caption2"
        sx={{ textAlign: "center", color: "text.secondary" }}
      >
        {amount}
      </Typography>
      <Typography
        variant="caption2"
        sx={{ textAlign: "left", color: "text.secondary" }}
      >
        {total}
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
        maxHeight: "200px",
      }}
    >
      <Stack spacing={2}>
        {rows.map((row, index) => (
          <OrderBookRowItem
            key={`${priceColor}-${index}`}
            {...row}
            priceColor={priceColor}
          />
        ))}
      </Stack>
    </ScrollContainer>
  );
}

export default function OrderBook() {
  return (
    <PanelPaper
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "4px 10px 20px 10px",
        maxWidth: "270px",
        height: "100%",
      }}
    >
      {/* Tabs (fixed height) */}
      <TabsProvider defaultState="open-orders">
        <Tabs size="small">
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

          <Box sx={{ display: "flex", alignItems: "center", mr: "34px" }}>
            <TradeOrderIcon sx={{ cursor: "pointer" }} />
          </Box>
        </Tabs>
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
        {/* SELL (flex share) */}

        <OrderBookList rows={SAMPLE_SELL_ORDERS} priceColor="status.loss" />

        {/* Middle price (fixed) */}
        <Typography
          variant="button3"
          sx={{
            py: "12px",
            textAlign: "center",
            color: "status.loss",
          }}
        >
          {formatFaPrice(245785000)}
        </Typography>

        {/* BUY (flex share) */}
        <OrderBookList rows={SAMPLE_BUY_ORDERS} priceColor="status.profit" />
      </Box>
    </PanelPaper>
  );
}
