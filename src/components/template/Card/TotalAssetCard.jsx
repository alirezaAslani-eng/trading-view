import { ReceiveIcon, SendIcon } from "@/components/ui/Icon";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import {
  Box,
  Button,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";

function TotalAssetCard() {
  return (
    <Stack sx={{ gap: "68px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack sx={{ gap: "12px" }}>
          <Typography variant="body1" sx={{ color: "text.heading" }}>
            {"ارزش کل دارایی"}
          </Typography>
          <Price sx={{ gap: "10px", color: "text.heading" }}>
            <PriceAmount variant="h5">{"12.840.500.000"}</PriceAmount>
            <PriceUnit variant="body1" />
          </Price>
        </Stack>

        <ToggleButtonGroup
          value={"2"}
          color="nuteral"
          size="medium"
          sx={{ width: "192px" }}
        >
          <ToggleButton value={"2"}>{"ریال"}</ToggleButton>
          <ToggleButton value={"1"}>{"آهن آلات"}</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "61px",
          alignItems: "center",
          px: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack sx={{ gap: "4px" }}>
            <Typography variant="button2" sx={{ color: "text.caption" }}>
              {"موجودی نقد آزاد"}
            </Typography>
            <Price>
              <PriceAmount>{"45.000.000"}</PriceAmount>
              <PriceUnit />
            </Price>
          </Stack>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "border.default", mx: "32px" }}
          />

          <Stack sx={{ gap: "4px" }}>
            <Typography variant="button2" sx={{ color: "text.caption" }}>
              {"سود/ضرر 24 ساعته"}
            </Typography>
            <Price sx={{ color: "text.profit" }}>
              <PriceAmount>{"1.700.000"}</PriceAmount>
              <PriceUnit />
              <Typography variant="button2">{"1.4%"}</Typography>
            </Price>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            fullWidth
            sx={{ gap: "2px", px: "4px" }}
          >
            <ReceiveIcon />
            {"واریز"}
          </Button>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            sx={{ gap: "2px", px: "4px" }}
          >
            <SendIcon />
            {"برداشت"}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}

export default TotalAssetCard;
