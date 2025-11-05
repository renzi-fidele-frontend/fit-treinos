import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   partesDoCorpo: null,
   parteDoCorpoEscolhida: null,
   filtros: { equipamento: "todos", musculoAlvo: "todos", parteDoCorpo: "todos" },
   equipamentos: null,
   musculoAlvo: null,
   paginaAtual: 1,
   periodo: "semana",
};

const configsSlice = createSlice({
   name: "Configs",
   initialState,
   reducers: {
      setPartesDoCorpo: (state, action) => {
         state.partesDoCorpo = action.payload;
      },
      setParteDoCorpoEscolhida: (state, action) => {
         state.parteDoCorpoEscolhida = action.payload;
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
      setPeriodo: (state, action) => {
         state.periodo = action.payload;
      },
   },
});

export const { setPartesDoCorpo, setParteDoCorpoEscolhida, setFiltros, setEquipamentos, setMusculoAlvo, setPaginaAtual, setPeriodo } = configsSlice.actions;

export default configsSlice.reducer;
