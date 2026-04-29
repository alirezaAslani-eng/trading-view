import React from "react";

/**
 * @returns {import("react").ReactNode}
 */
function renderValueOnDisplay({ selectedValue, children }) {
  
  const selectedItem = React.Children.toArray(children?.props?.children).find((child) => {
    return child?.props?.value === selectedValue;
  });
  return selectedItem?.props?.children;
}

export default renderValueOnDisplay;
