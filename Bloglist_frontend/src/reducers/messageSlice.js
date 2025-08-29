import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: null,
  reducers: {
    printMsg: (state, action) => {
      return action.payload;
    },

    clearMsg: () => {
      return null;
    },
  },
});

export const { printMsg, clearMsg } = messageSlice.actions;
export default messageSlice.reducer;
