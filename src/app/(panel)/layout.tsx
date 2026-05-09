"use client";
import React from "react";
import LayoutMainPanel from "@/Layout/LayoutMainPanel";
import { PWC } from "@/types/utils";

function layout({ children }:PWC) {
  return <LayoutMainPanel>{children}</LayoutMainPanel>;
}

export default layout;
