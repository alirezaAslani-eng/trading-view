"use client";
import { ArrowUpDownIcon } from "@/components/ui/Icon";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import { Box, Button, Stack, styled, Typography } from "@mui/material";

const SmallBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flex: "0 0 100px",
  alignItems: "center",
  gap: "8px",
  px: "4px",
  backgroundColor: theme.palette.background.surfaceTertiary,
  borderRadius: "10px",
}));

function ExchangeAssetForm() {
  return (
    <PagePaper sx={{ pb: "11px" }}>
      <PagePaperHeading>
        <PagePaperTitle>{"تبدیل دارایی"}</PagePaperTitle>
      </PagePaperHeading>
      <Stack sx={{ mt: "14px", gap: "4px" }}>
        <Typography
          variant="caption2"
          sx={{ color: "text.caption", alignSelf: "end" }}
        >
          {"معادل:  ۵۹,۴۰۰,۰۰۰  تومان"}
        </Typography>
        <Stack sx={{ gap: "16px" }}>
          <TemporaryComponent>
            <SmallBox>
              <Typography variant="button3" sx={{ color: "text.onPrimary" }}>
                {"100,000"}
              </Typography>
              <Typography variant="caption2" sx={{ color: "text.caption" }}>
                {"کیلوگرم"}
              </Typography>
            </SmallBox>
          </TemporaryComponent>
          <TemporaryComponent>
            <SmallBox sx={{ backgroundColor: "transparent" }}>
              <Typography variant="button4" sx={{ color: "text.onPrimary" }}>
                {"معادل:  ۴۰  شاخه"}
              </Typography>
            </SmallBox>
          </TemporaryComponent>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
        <Button
          sx={{ mx: "auto", width: "92px", gap: "6px" }}
          size="small"
          variant="outlined"
        >
          <ArrowUpDownIcon sx={{ color: "inherit" }} fontSize="small" />
          {"تبدیل"}
        </Button>
      </Box>
    </PagePaper>
  );
}

export default ExchangeAssetForm;

function TemporaryComponent({ children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="caption"
        sx={{ color: "text.caption", width: "58px", pl: "4px" }}
      >
        {"محصول"}
      </Typography>

      <Box
        sx={{
          flex: "1",
          display: "flex",
          alignItems: "stretch",
          gap: "8px",
        }}
      >
        <InputSelect variant="outlined" value="1" sx={{ flex: 1 }}>
          <InputSelectMenu>
            <InputSelectItem value="1">
              {" ثبللب بلمیلگرد ۱۴ ذوب آهن اصل"}
            </InputSelectItem>
            <InputSelectItem value="2">{"  ۱۴ ذوب آهن اصل"}</InputSelectItem>
            <InputSelectItem value="3">{"   ۱۴ ذوب آهن "}</InputSelectItem>
            <InputSelectItem value="4">{" ثبللب  ذوب  اصل"}</InputSelectItem>
          </InputSelectMenu>
        </InputSelect>

        {children}
      </Box>
    </Box>
  );
}
