import { RootState } from "@/redux/store/types";

const selectProductCode = (state: RootState) => state.trading.productCode;

export { selectProductCode };
