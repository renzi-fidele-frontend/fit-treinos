import { createSlice } from "@reduxjs/toolkit";

const initialState = { categorias: null, categoriaEscolhida: "", exercicios: null, exerciciosDeCategoria: null, filtragemExercicios: null };

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
      setFiltragemExercicios: (state, action) => {
         state.filtragemExercicios = action.payload;
      },
   },
});

export const { setCategorias, setExercicios, setEscolhida, setExerciciosDeCategoria, setFiltragemExercicios } = exerciciosSlice.actions;

export default exerciciosSlice.reducer;
