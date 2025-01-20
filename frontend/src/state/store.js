import { configureStore } from "@reduxjs/toolkit";
import exerciciosReducer from "./exercicios/exerciciosSlice";
import authReducer from "./auth/authSlice";
import temaReducer from "./theme/themeSlice";

export default configureStore({ reducer: { exercicios: exerciciosReducer, auth: authReducer, tema: temaReducer } });
