import { configureStore } from "@reduxjs/toolkit";
import { kycModalSlice } from "../features/kyc";
import { authModalSlice } from "../features/auth";
import { tradingSlice } from "../features/trading";
const store = configureStore({
  reducer: {
    kycModal: kycModalSlice.reducer,
    authModal: authModalSlice.reducer,
    trading: tradingSlice.reducer,
  },
});

export { store };
export const dispatch = store.dispatch;
