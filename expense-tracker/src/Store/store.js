import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";
import themeReducer from "./themeSlice"
import uiReducer from "./uiSlice";
import cartReducer from "./cartSlice"

const store = configureStore({
  reducer: { 
    auth: authReducer, 
    expenseStore: expenseReducer,
    theme: themeReducer,
    ui:uiReducer,
    cart: cartReducer
  },
});

export default store;