import { configureStore } from "@reduxjs/toolkit";
import exerciciosReducer from "./exercicios/exerciciosSlice";
import authReducer from "./auth/authSlice";

export default configureStore({ reducer: { exercicios: exerciciosReducer, auth: authReducer } });
