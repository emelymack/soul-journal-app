import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";

export const soulJournalStore = configureStore({
  reducer: {
    authReducer
  }
})

setupListeners(soulJournalStore.dispatch)