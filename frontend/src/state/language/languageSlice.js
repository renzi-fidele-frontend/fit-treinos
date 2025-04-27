import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   idioma: "pt",
};

const languageSlice = createSlice({
   name: "Language",
   initialState,
   reducers: {
      setIdioma: (state, action) => {
         state.idioma = action.payload;
      },
   },
});

export const { setIdioma } = languageSlice.actions;
export default languageSlice.reducer;
