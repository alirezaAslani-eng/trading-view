import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

interface PrecentProps extends Omit<TypographyProps, "children"> {
  value?: number;
  decimals?: number;
  showSign?: boolean;
  neutralThreshold?: number;
}

const StyledPercentTypography = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.body2?.fontFamily,
  fontSize: theme.typography.body2?.fontSize,
  lineHeight: theme.typography.body2?.lineHeight,
  "&.Mui-profit": {
    color: theme.palette.text.profit!,
  },
  "&.Mui-loss": {
    color: theme.palette.status.loss!,
  },
  "&.Mui-neutral": {
    color: theme.palette.text.secondary!,
  },
}));

const Precent = ({
  value = 0,
  decimals = 2,
  showSign = true,
  neutralThreshold = 0,
  ...typographyProps
}: PrecentProps) => {
  const isPositive = value > neutralThreshold;
  const isNegative = value < -neutralThreshold;

  const sign = !showSign ? "" : isPositive ? "+" : isNegative ? "-" : "";
  const absValue = Math.abs(value).toFixed(decimals);
  const formatted = `% ${absValue} ${sign}`;

  return (
    <StyledPercentTypography
      component={"span"}
      variant={"body2"}
      {...typographyProps}
      className={clsx(
        {
          "Mui-profit": isPositive,
          "Mui-loss": isNegative,
          "Mui-neutral": !isPositive && !isNegative,
        },
        typographyProps.className,
      )}
    >
      {formatted}
    </StyledPercentTypography>
  );
};

export default Precent;
