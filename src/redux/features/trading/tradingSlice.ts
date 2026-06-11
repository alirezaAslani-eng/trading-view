import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TradingState {
  productCode: string | null;
}

const initialState: TradingState = {
  productCode: null,
};

const tradingSlice = createSlice({
  name: "trading",
  initialState,
  reducers: {
    setProductCode(state, action: PayloadAction<string>) {
      state.productCode = action.payload;
    },
    initProductCode(state, action: PayloadAction<string>) {
      if (!!state.productCode) return;
      state.productCode = action.payload;
    },
  },
});

const { setProductCode } = tradingSlice.actions;
export { tradingSlice, setProductCode };
