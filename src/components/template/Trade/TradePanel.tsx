"use client";

import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import Tabs from "@/components/ui/Tabs/Tabs";
import { TabsProvider } from "@/context/app/TabsContext";
import { Box, Stack, Tab, ToggleButton } from "@mui/material";
import { InputTrade } from "./InputTrade";
import { Percent, PercentButtons } from "./PercentButtons";
import AmountDisplay from "./AmountDisplay";
import { formatFaPrice } from "@/utils";
import Button from "@/components/ui/Button/Button";
import TradeToggleButton from "./TradeToggleButton";

function TradePanel() {
  return (
    <PanelPaper sx={{ p: "20px 12px", height: "100%" }}>
      <Stack sx={{ width: "100%" }}>
        {/* //* Trade side selection (Buy / Sell) */}
       <TradeToggleButton value={"sell"}  size="large"/>

        <Box sx={{ mt: "calc(32px - 14px)" }}>
          {/* //* Order type tabs */}
          <TabsProvider defaultState={"define-price"}>
            <Tabs size="small">
              <Tab label="تعیین قیمت" value={"define-price"} />
              <Tab label="فوری" value={"quick-trade"} />
              <Tab label="استاپ لیمیت" value={"stop-limit"} />
            </Tabs>
          </TabsProvider>

          {/* //* Trade inputs */}
          <Box sx={{ mt: "32px" }}>
            <InputTrade label="قیمت (تومان)" />
          </Box>

          <Box sx={{ mt: "14px" }}>
            <InputTrade label="مقدار" />
          </Box>

          {/* //* Quick percentage selector */}
          <PercentButtons sx={{ mt: "8px" }}>
            <Percent precent="25%" />
            <Percent precent="50%" />
            <Percent precent="75%" />
            <Percent precent="100%" />
          </PercentButtons>

          {/* //* Calculated order total */}
          <AmountDisplay
            label="کل (تومان)"
            sx={{ mt: "24px" }}
            value={formatFaPrice(200000)}
          />

          {/* //* Submit order */}
          <Button
            fullWidth
            color="error"
            variant="contained"
            sx={{ mt: "74px" }}
          >
            {"خرید"}
          </Button>
        </Box>
      </Stack>
    </PanelPaper>
  );
}

export default TradePanel;
