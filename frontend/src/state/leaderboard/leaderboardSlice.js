import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   filtro: "rank",
   ordem: "decrescente",
};

const leaderboardSlice = createSlice({
   name: "Leaderboard",
   initialState,
   reducers: {
      setFiltro: (state, action) => {
         state.filtro = action.payload;
      },
      setOrdem: (state, action) => {
         state.ordem = action.payload;
      },
   },
});

export const { setFiltro, setOrdem } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
