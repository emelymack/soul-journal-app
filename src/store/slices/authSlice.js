import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      userId: null,
      email: null
    },
    token: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user.userId = action.payload.localId;
      state.user.email = action.payload.email;
      state.token = action.payload.idToken;
    },
    clearUser: (state) => {
      state.user = { userId: null, email: null };
      state.token = null;
    }
  }
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer