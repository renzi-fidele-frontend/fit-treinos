import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null, mostrarModalAuth: false };

const authSlice = createSlice({
   name: "Auth",
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },
      setToken: (state, action) => {
         state.token = action.payload;
      },
      setMostrarModalAuth: (state, action) => {
         state.mostrarModalAuth = action.payload;
      },
   },
});

export const { setUser, setToken, setMostrarModalAuth } = authSlice.actions;

export default authSlice.reducer;
