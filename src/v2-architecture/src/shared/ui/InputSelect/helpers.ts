import React, { ReactNode, ReactElement } from "react";

type MenuItemProps = {
  value: string | number;
  children: ReactNode;
};

type MenuProps = {
  children: ReactNode;
};

type RenderValueOnDisplayProps = {
  selectedValue: string | number;
  children: ReactNode;
};

function renderValueOnDisplay({
  selectedValue,
  children,
}: RenderValueOnDisplayProps): ReactNode {
  const menu = React.Children.toArray(children)[0] as
    | ReactElement<MenuProps>
    | undefined;

  const menuItems = React.Children.toArray(
    menu?.props?.children
  ) as ReactElement<MenuItemProps>[];

  const selectedItem = menuItems.find(
    (child) => child?.props?.value === selectedValue
  );

  return selectedItem?.props?.children ?? null;
}

export { renderValueOnDisplay };
