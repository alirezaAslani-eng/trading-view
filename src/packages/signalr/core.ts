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

export function createStarter() {
  let startPromise: Promise<void> | null = null;

  return async function start(conn: HubConnection) {
    if (startPromise) {
      return startPromise;
    }

    startPromise = conn.start();

    return startPromise;
  };
}
