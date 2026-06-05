import { configureStore } from "@reduxjs/toolkit";
import { kycModalSlice } from "../features/kyc";
import { authModalSlice } from "../features/auth";
const store = configureStore({
  reducer: {
    kycModal: kycModalSlice.reducer,
    authModal: authModalSlice.reducer,
  },
});

export { store };
export const dispatch = store.dispatch;
