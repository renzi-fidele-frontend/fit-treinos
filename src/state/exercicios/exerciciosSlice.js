import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   categorias: null,
   categoriaEscolhida: "",
   exercicios: null,
   exerciciosDeCategoria: null,
   exerciciosFiltrados: null,
   filtros: null,
   equipamentos: null,
   musculoAlvo: null,
};

const exerciciosSlice = createSlice({
   name: "Exercicios",
   initialState,
   reducers: {
      setCategorias: (state, action) => {
         state.categorias = action.payload;
      },
      setCategoriaEscolhida: (state, action) => {
         state.categoriaEscolhida = action.payload;
      },
      setExercicios: (state, action) => {
         state.exercicios = action.payload;
      },
      setExerciciosDeCategoria: (state, action) => {
         state.exerciciosDeCategoria = action.payload;
      },
      setFiltros: (state, action) => {
         state.filtros = action.payload;
      },
      setEquipamentos: (state, action) => {
         state.equipamentos = action.payload;
      },
      setMusculoAlvo: (state, action) => {
         state.musculoAlvo = action.payload;
      },
      setExerciciosFiltrados: (state, action) => {
         state.exerciciosFiltrados = action.payload;
      },
   },
});

export const {
   setCategorias,
   setExercicios,
   setCategoriaEscolhida,
   setExerciciosDeCategoria,
   setFiltros,
   setEquipamentos,
   setMusculoAlvo,
   setExerciciosFiltrados,
} = exerciciosSlice.actions;

export default exerciciosSlice.reducer;
