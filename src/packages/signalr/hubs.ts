import { createHub, createStarter } from "./core";
import { HubConnectionBuilder } from "@microsoft/signalr";

const BASE_URL = process.env.NEXT_PUBLIC_HUB_BASEURL!;

export const marketHub = {
  start: createStarter(),
  onTickLog: createEventLogger("Market Hub"),
  build: createHub(() => {
    return new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/market`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();
  }),
};
export const walletHub = {
  start: createStarter(),
  onTickLog: createEventLogger("Wallet Hub"),
  build: createHub(() => {
    return new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/wallet`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();
  }),
};
export const orderHub = {
  start: createStarter(),
  onTickLog: createEventLogger("Order Hub"),
  build: createHub(() => {
    return new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/orders`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();
  }),
};

type LogLevel = "info" | "success" | "warn" | "error";

function createEventLogger(title: string) {
  return ({ source, event }: { source: string; event: string }) => {
    logger(title, `Updated ${source} by ${event}`, "info");
  };
}

const styles: Record<LogLevel, string> = {
  info: "background:#2563eb;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;",
  success:
    "background:#16a34a;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;",
  warn: "background:#f59e0b;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;",
  error:
    "background:#dc2626;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;",
};

export function logger(
  title: string,
  data?: unknown,
  level: LogLevel = "info"
) {
  const time = new Date().toLocaleTimeString();

  console.groupCollapsed(
    `%c ${title.toUpperCase()} %c ${title} %c ${time}`,
    styles[level],
    "font-weight:bold;color:#111827;",
    "color:#6b7280;"
  );

  if (data !== undefined) {
    console.log(data);
  }

  console.trace("Stack");
  console.groupEnd();
}
