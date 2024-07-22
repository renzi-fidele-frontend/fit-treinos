import { createSlice } from "@reduxjs/toolkit";

const initialState = { categorias: null, escolhida: null };

const exerciciosSlice = createSlice({
   name: "Exercicios",
   initialState,
   reducers: {
      setCategorias: (state, action) => {
         state.categorias = action.payload;
      },
      setEscolhida: (state, action) => {
         state.escolhida = action.payload;
      },
   },
});

export const { setCategorias, setEscolhida } = exerciciosSlice.actions;

export default exerciciosSlice.reducer;
