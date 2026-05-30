"use client";
import { store } from "@/redux/store/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

function ReduxProvider(props: PropsWithChildren) {
  return <Provider store={store}>{props.children}</Provider>;
}

export { ReduxProvider };
