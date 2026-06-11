import { HubConnectionBuilder, type HubConnection } from "@microsoft/signalr";

let connection: HubConnection | null = null;
let started = false;

function getConnection(): HubConnection | null {
  if (typeof window === "undefined") return null;
  if (!connection) {
    console.log("signalr: creating object");
    connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/stocks", { withCredentials: true })
      .withAutomaticReconnect()
      .build();
  }
  return connection;
}

async function start(conn: HubConnection) {
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

export { getConnection, start };
