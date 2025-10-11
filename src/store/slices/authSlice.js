import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: ""
  },
  reducers: {
    setUserEmail: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setUserEmail } = authSlice.actions

export default authSlice.reducer