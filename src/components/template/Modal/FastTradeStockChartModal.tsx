"use client";

import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import { AreaLineChart } from "@/components/ui/Chart";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import { Box, Dialog, Divider, ToggleButton } from "@mui/material";
import { useState } from "react";

type Timeframe = "monthly" | "quarterly" | "biannual" | "annual";

const timeframeLabels: Record<Timeframe, string> = {
  monthly: "ماهانه",
  quarterly: "سه ماهه",
  biannual: "شش ماهه",
  annual: "سالانه",
};

const chartDataByTimeframe: Record<Timeframe, number[]> = {
  monthly: [12, 18, 15, 22, 28, 24, 32, 38, 34, 42, 45, 40, 36, 44, 48],
  quarterly: [10, 16, 20, 18, 26, 30, 28, 35, 33, 40, 38, 45],
  biannual: [8, 14, 12, 20, 24, 22, 30, 28, 36, 34, 42, 40, 46, 44, 50, 48],
  annual: [6, 12, 10, 18, 16, 24, 22, 30, 28, 36, 34, 42, 40, 46, 44, 50],
};

type FastTradeStockChartModalProps = {
  open: boolean;
  onClose: () => void;
  assetName: string;
};

function FastTradeStockChartModal({
  open,
  onClose,
  assetName,
}: FastTradeStockChartModalProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");

  const handleTimeframeChange = (_: unknown, value: Timeframe | null) => {
    if (!value) return;
    setTimeframe(value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            background: "transparent",
            boxShadow: "none",
            maxWidth: "720px",
            width: "100%",
          },
        },
      }}
    >
      <ModalLayout sx={{ width: "100%" }}>
        <ModalLayoutHeading>
          <ModalLayoutTitle
            title={`نمودار ${assetName}`}
            subtitle={`نمایش نمودار و اطلاعات ${assetName}`}
          />
          <ModalLayoutCloseIcon onClick={onClose} />
        </ModalLayoutHeading>

        <ModalLayoutBody sx={{ gap: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ToggleTabGroup
              size="small"
              value={timeframe}
              onChange={handleTimeframeChange}
            >
              <ToggleButton value="annual">{timeframeLabels.annual}</ToggleButton>
              <Divider orientation="vertical" flexItem />
              <ToggleButton value="biannual">
                {timeframeLabels.biannual}
              </ToggleButton>
              <Divider orientation="vertical" flexItem />
              <ToggleButton value="quarterly">
                {timeframeLabels.quarterly}
              </ToggleButton>
              <Divider orientation="vertical" flexItem />
              <ToggleButton value="monthly">
                {timeframeLabels.monthly}
              </ToggleButton>
            </ToggleTabGroup>
          </Box>

          <Box sx={{ minHeight: "320px" }}>
            <AreaLineChart
              data={chartDataByTimeframe[timeframe]}
              height={320}
            />
          </Box>
        </ModalLayoutBody>
      </ModalLayout>
    </Dialog>
  );
}

export default FastTradeStockChartModal;
