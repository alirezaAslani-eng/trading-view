"use client";
import { QueryClientProvider as _QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import queryClient from "@/packages/react-query/core/queryClient";

function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <_QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </_QueryClientProvider>
  );
}

export default QueryClientProvider;
