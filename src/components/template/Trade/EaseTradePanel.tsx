"use client";
import EaseTradeSymbolList from "@/components/template/Trade/EaseTradeSymbolList";
import FastTradeForm from "@/components/template/Form/EaseTradeForm";
import ToggleButtonGroup from "@/components/ui/ButtonGroup/ToggleButtonGroup";
import { PagePaper } from "@/components/ui/Layout/PaperLayout";
import tradeTogglebuttonSell_sx from "@/packages/mui/theme/shared-style/features/trading/tradeTogglebuttonSell_sx";
import { Box, Stack, ToggleButton } from "@mui/material";

function EaseTradePanel() {
  // TODO Implement statemanagement using useForm and <FormProvider />
  // TODO Complete the component's sections
  return (
    <PagePaper
      sx={{
        display: "flex",
        alignItems: "stretch",
        gap: "48px",
        p: "28px 64px",
      }}
    >
      <Stack spacing={6} sx={{ width: "346px" }}>
        <ToggleButtonGroup color="success" size="large" value={"buy"}>
          <ToggleButton value={"buy"}>{"خرید"}</ToggleButton>
          <ToggleButton value={"sell"} sx={tradeTogglebuttonSell_sx}>
            {"فروش"}
          </ToggleButton>
        </ToggleButtonGroup>
        <EaseTradeSymbolList />
      </Stack>

      <Box sx={{ flex: 1 }}>
        <FastTradeForm />
      </Box>
    </PagePaper>
  );
}

export default EaseTradePanel;
