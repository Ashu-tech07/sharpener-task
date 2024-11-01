import { createSlice } from "@reduxjs/toolkit"

const initialAuthState={
    isAuthenticate: !!localStorage.getItem('token')
}
const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticate=true
        },
        logout(state){
            localStorage.removeItem('token');
            state.isAuthenticate=false
        }
    }
})
export const {login, logout}=authSlice.actions;
export default authSlice.reducer