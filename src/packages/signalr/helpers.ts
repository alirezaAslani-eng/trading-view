type SignalRLogAction =
  | "CONNECTION_CREATED"
  | "CONNECTION_STARTED"
  | "CONNECTION_FAILED"
  | "CONNECTION_CLOSED"
  | "LISTENER_REGISTERED"
  | "LISTENER_REMOVED"
  | "EVENT_RECEIVED"
  | "INVOKE_STARTED"
  | "INVOKE_SUCCESS"
  | "INVOKE_FAILED"
  | "CACHE_UPDATED"
  | "CACHE_INVALIDATED"
  | "RECONNECT_STARTED"
  | "RECONNECT_SUCCESS"
  | "RECONNECT_FAILED";

type Hubs = "wallet" | "market" | "orders";

export function signalRLog(
  hub: Hubs,
  action: SignalRLogAction,
  data?: unknown,
) {
  console.log(`[SIGNALR] [${hub}] ${action}`, data ?? "");
}
