import { createSlice } from "@reduxjs/toolkit";

const initialState = { exercicios: null, exerciciosDeCategoria: [], exerciciosFiltrados: null, exerciciosPaginados: null };

const exerciciosSlice = createSlice({
   name: "Exercicios",
   initialState,
   reducers: {
      setExercicios: (state, action) => {
         state.exercicios = action.payload;
      },
      setExerciciosDeCategoria: (state, action) => {
         state.exerciciosDeCategoria = action.payload;
      },
      setExerciciosFiltrados: (state, action) => {
         state.exerciciosFiltrados = action.payload;
      },
      setExerciciosPaginados: (state, action) => {
         state.exerciciosPaginados = action.payload;
      },
   },
});

export const { setExercicios, setExerciciosDeCategoria, setExerciciosFiltrados, setExerciciosPaginados } = exerciciosSlice.actions;
export default exerciciosSlice.reducer;
