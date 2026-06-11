"use client";
import PanelPaper from "@/components/ui/Paper/PanelPaper";
import { formatFaPrice } from "@/utils";
import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import {
  Price,
  PriceAmount,
  PriceUnit,
} from "@/components/ui/Typography/Price";
import {
  Box,
  Stack,
  StackProps,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
} from "@mui/material";
import {
  InputSelect,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  SelectInputLoader,
  SelectInputLoaderText,
} from "@/components/ui/Fallback/SelectInputLoader";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { useDispatch, useSelector } from "@/packages/redux";
import { selectProductCode, setProductCode } from "@/redux/features/trading";

const inputSelect_sx: SxProps<Theme> = ({ typography }) => ({
  fontSize: typography.button1.fontSize,
  width: "188px",
  height: "51px",
  "&.Mui-placeholder": {
    fontSize: typography.button1.fontSize,
  },
  "& .MuiSvgIcon-root": {
    width: "18px",
    height: "18px",
  },
});

const price_sx = { color: "text.onPrimary" };
const oveview_card_title_sx = { color: "text.caption" };

function PriceOverview() {
  return (
    <PanelPaper
      sx={{
        p: "16px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: "88px",
      }}
    >
      <InputSelectProductCode />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          minWidth: "0px",
          gap: "40px",
        }}
      >
        <PriceOverviewCard>
          <PriceOverviewCardTitle>{"آخرین قیمت"}</PriceOverviewCardTitle>
          <Price>
            <PriceAmount sx={{ color: "text.profit" }}>
              {formatFaPrice(28000)}
            </PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        </PriceOverviewCard>

        <PriceOverviewCard>
          <PriceOverviewCardTitle sx={oveview_card_title_sx}>
            {"درصد تغییرات"}
          </PriceOverviewCardTitle>
          <Typography variant="button2" sx={{ color: "text.profit" }}>
            {"+ 0.11%"}
          </Typography>
        </PriceOverviewCard>

        <PriceOverviewCard>
          <PriceOverviewCardTitle sx={oveview_card_title_sx}>
            {"آخرین قیمت"}
          </PriceOverviewCardTitle>
          <Price sx={price_sx}>
            <PriceAmount>{formatFaPrice(28000)}</PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        </PriceOverviewCard>
        <PriceOverviewCard>
          <PriceOverviewCardTitle sx={oveview_card_title_sx}>
            {"بیشترین قیمت"}
          </PriceOverviewCardTitle>
          <Price sx={price_sx}>
            <PriceAmount>{formatFaPrice(28000)}</PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        </PriceOverviewCard>
        <PriceOverviewCard>
          <PriceOverviewCardTitle sx={oveview_card_title_sx}>
            {"قیمت مبنا"}
          </PriceOverviewCardTitle>
          <Price sx={price_sx}>
            <PriceAmount>{formatFaPrice(28000)}</PriceAmount>
            <PriceUnit variant="caption1" />
          </Price>
        </PriceOverviewCard>
      </Box>
    </PanelPaper>
  );
}

function PriceOverviewCard(stackProps: StackProps) {
  return (
    <Stack
      spacing={2}
      {...stackProps}
      sx={{ flex: 1, minWidth: "0px", ...stackProps.sx }}
    />
  );
}

function PriceOverviewCardTitle(
  props: ReplaceSxWithSxOnlyObject<TypographyProps>,
) {
  return (
    <Typography
      {...props}
      variant="caption1"
      sx={{ color: "text.onPrimary", ...props.sx }}
    />
  );
}

function InputSelectProductCode() {
  // TODO fetch products and initialize the state

  const dispatch = useDispatch();
  const productCode = useSelector(selectProductCode);

  const onChangeHandler = (val: string) => {
    dispatch(setProductCode(val));
  };

  return (
    <>
      <InputSelect
        variant="outlined"
        sx={inputSelect_sx}
        placeholder="نماد"
        value={productCode ?? ""}
        onChange={onChangeHandler}
      >
        <InputSelectMenu>
          <FallbackHandler
            isLoading={true}
            isError={true}
            fallbacks={{
              loader: (
                <SelectInputLoader>
                  <SelectInputLoaderText />
                </SelectInputLoader>
              ),
            }}
          />

          {/* {products.map((product) => {
            return (
              <InputSelectItem key={product.id} value={product.productCode}>
                {product.title}
              </InputSelectItem>
            );
          })} */}
        </InputSelectMenu>
      </InputSelect>
    </>
  );
}
export default PriceOverview;
