import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import { authApi } from "../services/authApi";
import { journalApi } from "../services/journalApi";

export const soulJournalStore = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [journalApi.reducerPath]: journalApi.reducer
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(journalApi.middleware)
  )
})

setupListeners(soulJournalStore.dispatch)