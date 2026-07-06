"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { closeAccesssModal } from "@/redux/features/kyc/kycModalSlice";
import { RootState } from "@/redux/store/types";
export default function AccessLevelModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const open = useSelector((state: RootState) => state.kycModal.open);
  const closeHandler = () => {
    dispatch(closeAccesssModal());
  };
  const upgradeHandler = () => {
    dispatch(closeAccesssModal());
    router.push("/panel/profile/kyc/level-1");
  };
  return (
    <Dialog open={open} onClose={closeHandler} fullWidth maxWidth="xs">
      <DialogTitle> دسترسی محدود </DialogTitle>
      <DialogContent>
        <Typography>
          برای استفاده از این بخش ابتدا باید احراز هویت سطح یک را تکمیل
          کنید.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}> انصراف </Button>
        <Button variant="contained" onClick={upgradeHandler}>
          ارتقای سطح
        </Button>
      </DialogActions>
    </Dialog>
  );
}

