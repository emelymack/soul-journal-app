import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import { authApi } from "../services/authApi";

export const soulJournalStore = configureStore({
  reducer: {
    authReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware()
      .concat(authApi.middleware)
  )
})

setupListeners(soulJournalStore.dispatch)