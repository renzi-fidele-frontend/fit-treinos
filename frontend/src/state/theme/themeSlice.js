import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   modoEscuro: false,
};

const temaSlice = createSlice({
   name: "Tema",
   initialState,
   reducers: {
      setModoEscuro: (state, action) => {
         state.modoEscuro = action.payload;
      },
   },
});

export const { setModoEscuro } = temaSlice.actions;
export default temaSlice.reducer;
