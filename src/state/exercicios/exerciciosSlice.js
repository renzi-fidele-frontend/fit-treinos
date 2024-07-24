import { createSlice } from "@reduxjs/toolkit";

const initialState = { categorias: null, categoriaEscolhida: "", exercicios: null, exerciciosDeCategoria: null };

const exerciciosSlice = createSlice({
   name: "Exercicios",
   initialState,
   reducers: {
      setCategorias: (state, action) => {
         state.categorias = action.payload;
      },
      setEscolhida: (state, action) => {
         state.categoriaEscolhida = action.payload;
      },
      setExercicios: (state, action) => {
         state.exercicios = action.payload;
      },
      setExerciciosDeCategoria: (state, action) => {
         state.exerciciosDeCategoria = action.payload;
      },
   },
});

export const { setCategorias, setExercicios, setEscolhida, setExerciciosDeCategoria } = exerciciosSlice.actions;

export default exerciciosSlice.reducer;
