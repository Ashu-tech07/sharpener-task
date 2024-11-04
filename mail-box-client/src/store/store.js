import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import inboxReducer from "./inboxSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    inbox: inboxReducer,
    auth: authReducer,
  },
});

export default store;
