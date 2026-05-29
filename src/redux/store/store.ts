import { configureStore } from "@reduxjs/toolkit";
import { kycModalSlice } from "../features/kyc";
const store = configureStore({
  reducer: {
    kycModal: kycModalSlice.reducer,
  },
});

export { store };
