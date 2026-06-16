import { Box, Stack, SxProps, Theme } from "@mui/material";
import AmountDisplay from "../Trade/AmountDisplay";
import { formatFaPrice } from "@/utils";
import { InputTrade } from "../Trade/InputTrade";
import Button from "@/components/ui/Button/Button";
import { FlashIcon, StockIcon } from "@/components/ui/Icon";


const chartTriggerButton_sx: SxProps<Theme> = {
  border: "1px solid",
  borderColor: "border.white",
  borderRadius: "14px",
  backgroundColor: "transparent",
};
const tradeButton_sx: SxProps<Theme> = {
  borderRadius: "14px",
  gap: "8px",
};

const submitButtonContainer_sx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
function FastTradeForm() {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "border.default",
        borderRadius: "16px",
        p: "24px",
      }}
    >
      <Stack spacing={2}>
        <AmountDisplay label="قیمت بازار" value={formatFaPrice(34000)} />
        <InputTrade label="مقدار (کیلوگرم)" />
        <AmountDisplay label="قیمت کل" value={formatFaPrice(34000)} />
      </Stack>
      <Box sx={submitButtonContainer_sx}>
        <Button
          size="large"
          color="success"
          variant="contained"
          fullWidth
          sx={tradeButton_sx}
        >
          <FlashIcon />
          {"خرید"}
        </Button>
        <Button size="large" sx={chartTriggerButton_sx}>
          <StockIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default FastTradeForm;
