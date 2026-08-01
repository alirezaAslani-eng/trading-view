"use client";
import { Provider } from "@ebay/nice-modal-react";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
