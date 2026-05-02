import { Typography, Stack } from "@mui/material";
import CirclePulse from "@/components/ui/Decorative/CirclePulse";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";

function BuySellQueueCard() {
  return (
    <PanelPaper
      sx={{
        p: "48px 38px",
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Stack spacing={1}>
        <Typography variant="button2" sx={{ color: "text.placeholder" }}>
          {"نقدینگی در صف خرید:"}
        </Typography>
        <Price>
          <PriceAmount>{"129,000,000"}</PriceAmount>
          <PriceUnit />
        </Price>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="button2" sx={{ color: "text.placeholder" }}>
          {" ارزش کالای در صف فروش:"}
        </Typography>
        <Price>
          <PriceAmount>{"129,000,000"}</PriceAmount>
          <PriceUnit />
        </Price>
      </Stack>

      {/* // * ------- Decorative Component ------- */}
      <CirclePulse
        first
        sx={{ width: "400px", transform: "translate(20%,50%)" }}
      >
        <CirclePulse sx={{ width: "300px" }}>
          <CirclePulse sx={{ width: "200px" }}></CirclePulse>
        </CirclePulse>
      </CirclePulse>
    </PanelPaper>
  );
}

export default BuySellQueueCard;
