import { createSlice } from "@reduxjs/toolkit";

const initialState = { dados: null };

const exerciciosSlice = createSlice({
   name: "Exercicios",
   initialState,
   reducers: {
      setDados: (state, action) => {
         state.dados = action.payload;
      },
   },
});

export const { setDados } = exerciciosSlice.actions;

export default exerciciosSlice.reducer;
