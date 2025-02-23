import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   categorias: null,
   categoriaEscolhida: null,
   filtros: null,
   equipamentos: null,
   musculoAlvo: null,
   paginaAtual: 1,
};

const configsSlice = createSlice({
   name: "Configs",
   initialState,
   reducers: {
      setCategorias: (state, action) => {
         state.categorias = action.payload;
      },
      setCategoriaEscolhida: (state, action) => {
         state.categoriaEscolhida = action.payload;
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
      setPaginaAtual: (state, action) => {
         state.paginaAtual = action.payload;
      },
   },
});

export const { setCategorias, setCategoriaEscolhida, setFiltros, setEquipamentos, setMusculoAlvo, setPaginaAtual } = configsSlice.actions;

export default configsSlice.reducer;
