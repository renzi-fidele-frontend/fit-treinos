import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n/i18n";

const initialState = {
   idioma: i18n.language,
};

const languageSlice = createSlice({
   name: "Idioma",
   initialState,
   reducers: {
      setIdioma: (state, action) => {
         state.idioma = action.payload;
      },
   },
});

export const { setIdioma } = languageSlice.actions;

export default languageSlice.reducer;
