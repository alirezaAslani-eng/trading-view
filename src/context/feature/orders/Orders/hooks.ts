import { useContext } from "react";
import { OrderFiltersContext } from "./OrderFiltersContext";
import { OrdersContext } from "./OrdersContext";

const useOrderFiltersProvider = () => useContext(OrderFiltersContext);
const useOrders = () => useContext(OrdersContext);

export { useOrderFiltersProvider, useOrders };
