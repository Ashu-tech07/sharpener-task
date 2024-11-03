import { configureStore } from "@reduxjs/toolkit";
import mailReducer from './mailSlice';

 const store = configureStore({
    reducer: {
      mail: mailReducer,
    },
  });

  export default store;