import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emails: null,
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    addEmail(state, action) {
      state.emails = action.payload;
    },
  },
});

export const {addEmail} = inboxSlice.actions;
export default inboxSlice.reducer;
