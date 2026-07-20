import { Box, styled } from "@mui/material";
import clsx from "clsx";

const StyledSelectItem = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "selected";
  },
})(({ theme }) => ({
  width: "100%",
  padding: "6px",
  borderRadius: "4px",
  color: theme.palette.text.placeHolder,
  fontSize: theme.typography.body3.fontSize,
  fontFamily: theme.typography.body3.fontFamily,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  ":hover": {
    backgroundColor: `${theme.palette.background.surfaceTertiary}`,
    color: `${theme.palette.text.onPrimary} `,
  },
  "&.Mui-selected": {
    backgroundColor: `${theme.palette.background.surfaceTertiary}`,
    color: `${theme.palette.text.onPrimary} `,
  },
}));

/**
 * @param {import("react").ComponentProps<typeof StyledSelectItem> & {selected:boolean}} props
 */
function SelectItem({ selected, ...props }) {
  return (
    <StyledSelectItem
      {...props}
      className={clsx(
        {
          "Mui-selected": selected,
        },
        props.className,
      )}
    />
  );
}
export default SelectItem;
