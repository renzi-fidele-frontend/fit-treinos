import { createSlice } from "@reduxjs/toolkit";

const initialState = { categorias: null, escolhida: "", exercicios: null };

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
      setExercicios: (state, action) => {
         state.exercicios = action.payload;
      },
   },
});

export const { setCategorias, setExercicios, setEscolhida } = exerciciosSlice.actions;

export default exerciciosSlice.reducer;
