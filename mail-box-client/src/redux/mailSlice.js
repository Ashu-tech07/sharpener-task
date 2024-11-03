import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
    name: 'mail',
    initialState: {
      to: '',
      subject: '',
      emailText: '',
    },
    reducers: {
      setTo: (state, action) => {
        state.to = action.payload;
      },
      setSubject: (state, action) => {
        state.subject = action.payload;
      },
      setEmailText: (state, action) => {
        state.emailText = action.payload;
      },
      clearFields: (state) => {
        state.to = '';
        state.subject = '';
        state.emailText = '';
      },
    },
  });
  
  export const { setTo, setSubject, setEmailText, clearFields } = mailSlice.actions;
  
  export const selectMail = (state) => state.mail;
  
  export default mailSlice.reducer;