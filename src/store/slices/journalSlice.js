import { createSlice } from "@reduxjs/toolkit";

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    entries: [],
    selectedEntry: {}
  },
  reducers: {
    addEntry: (state, action) => {

    },
    selectEntry: (state, action) => {
      state.selectedEntry = action.payload
    }
  }
})

export const { addEntry, selectEntry } = journalSlice.actions;

export default journalSlice.reducer;