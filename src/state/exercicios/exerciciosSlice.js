import { createSlice } from "@reduxjs/toolkit";

const initialState = { categorias: null };

const exerciciosSlice = createSlice({
   name: "Exercicios",
   initialState,
   reducers: {
      setCategorias: (state, action) => {
         state.categorias = action.payload;
      },
   },
});

export const { setCategorias } = exerciciosSlice.actions;

export default exerciciosSlice.reducer;
