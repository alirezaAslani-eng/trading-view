"use client";
import Button from "@/components/ui/Button/Button";
import { useDispatch } from "@/packages/redux";
import { upgradeKycLevel } from "@/redux/features/kyc";
import { ButtonProps } from "@mui/material";

function UpgradeKycAction(props: Omit<ButtonProps, "onClick">) {
  const dispatch = useDispatch();
  return (
    <Button
      {...props}
      onClick={(e) => {
        dispatch(upgradeKycLevel());
      }}
    />
  );
}

export default UpgradeKycAction;
