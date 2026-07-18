import { createHub, createStarter } from "./core";
import { HubConnectionBuilder } from "@microsoft/signalr";

const BASE_URL = process.env.NEXT_PUBLIC_HUB_BASEURL!;

export const marketHub = {
  start: createStarter(),
  build: createHub(() => {
    return new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/market`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();
  }),
};
export const walletHub = {
  start: createStarter(),
  build: createHub(() => {
    return new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/wallet`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();
  }),
};
export const orderHub = {
  start: createStarter(),
  build: createHub(() => {
    return new HubConnectionBuilder()
      .withUrl(`${BASE_URL}/orders`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();
  }),
};
