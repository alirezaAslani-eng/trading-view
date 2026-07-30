import { PropsWithChildren, ReactNode } from "react";

interface FallbackHandlerProps {
  isLoading?: boolean;
  isError?: boolean;
  dataLength?: number | undefined;
  fallbacks: {
    loader?: ReactNode;
    error?: ReactNode;
    noData?: ReactNode;
  };
}
function FallbackHandler(props: PropsWithChildren<FallbackHandlerProps>) {
  if (props.isLoading) return props?.fallbacks?.loader;
  if (props.isError) return props?.fallbacks?.error ?? props?.fallbacks?.loader;
  if (props.dataLength === 0) return props?.fallbacks?.noData;
  return props.children;
}

export default FallbackHandler;
