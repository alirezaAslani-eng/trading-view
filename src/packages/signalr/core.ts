// createHub.ts
import { HubConnection } from "@microsoft/signalr";

export function createHub(factory: () => HubConnection): () => HubConnection {
  let connection: HubConnection | null = null;

  return () => {
    if (connection) {
      return connection;
    }

    connection = factory();
    return connection;
  };
}

let started: boolean;

export async function start(conn: HubConnection) {
  if (started) return;
  started = true;

  try {
    await conn.start();
    console.log("signalr connected");
  } catch (err) {
    started = false;
    console.log("signalr failed", err);
  }
}
