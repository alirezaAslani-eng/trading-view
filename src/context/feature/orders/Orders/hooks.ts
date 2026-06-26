import { useContext } from "react";
import { OrderFiltersContext } from "./OrderFiltersContext";
import { OrdersContext } from "./OrdersContext";

const useOrderFilters = () => useContext(OrderFiltersContext);
const useOrders = () => useContext(OrdersContext);

export { useOrderFilters, useOrders };
