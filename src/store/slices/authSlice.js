import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    idToken: ""
  },
  reducers: {
    setUserEmail: (state, action) => {
      state.user = action.payload
    },
    setIdToken: (state, action) => {
      state.idToken = action.payload
    }
  }
})

export const { setUserEmail, setIdToken } = authSlice.actions

export default authSlice.reducer