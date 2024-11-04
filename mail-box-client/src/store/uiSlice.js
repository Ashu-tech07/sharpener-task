import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    composeMailVisible: false,
    inboxVisible: true,
    sentboxVisible: false,
  },
  reducers: {
    showCompose(state) {
      state.composeMailVisible = true;
      state.inboxVisible = false;
      state.sentboxVisible = false;
    },
    hideCompose(state) {
      state.composeMailVisible = false;
      state.sentboxVisible = false;
      state.inboxVisible = true;
    },
    showSent(state) {
      state.inboxVisible = false;
      state.composeMailVisible = false;
      state.sentboxVisible = true;
    },
    showInbox(state) {
      state.inboxVisible = true;
      state.composeMailVisible = false;
      state.sentboxVisible = false;
    },
  },
});

export const {showCompose,showInbox,showSent,hideCompose}= uiSlice.actions;
export default uiSlice.reducer;
