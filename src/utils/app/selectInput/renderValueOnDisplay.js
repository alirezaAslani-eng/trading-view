"use client"
import React from "react";

/**
 * @returns {import("react").ReactNode}
 */
function renderValueOnDisplay({ selectedValue, children }) {
  const menu = React.Children.toArray(children)?.[0];
  const menuitems = React.Children.toArray(menu?.props?.children);

  const selectedItem = menuitems.find((child) => {
    return child?.props?.value === selectedValue;
  });
  return selectedItem?.props?.children ?? null;
}

export default renderValueOnDisplay;
