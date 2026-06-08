import { Theme } from "@mui/material";
import { SxPropOnlyObject } from "../../../types";

const tradeTogglebuttonSell_sx = ({ palette }: Theme): SxPropOnlyObject => ({
  "&.Mui-selected": {
    backgroundColor: `${palette.background.sell} !important`,
  },
});

export default tradeTogglebuttonSell_sx;
