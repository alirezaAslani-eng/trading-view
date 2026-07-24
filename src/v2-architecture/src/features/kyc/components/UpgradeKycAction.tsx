"use client";

import { Button } from "@/v2-architecture/src/shared/ui";
import { upgradeKycLevel } from "../redux";
import { useDispatch } from "@/v2-architecture/src/store";
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
