import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: localStorage.getItem("isDark") === null ? false : true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme :(state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", state.isDark);
    },
  },
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;