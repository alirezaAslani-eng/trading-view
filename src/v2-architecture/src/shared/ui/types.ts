import { SwipeableDrawerProps } from "@mui/material";

export interface WrappedSwipeableDrawerProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}
