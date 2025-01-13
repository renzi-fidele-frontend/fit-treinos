import { configureStore } from "@reduxjs/toolkit";
import exerciciosReducer from "./exercicios/exerciciosSlice";

export default configureStore({ reducer: { exercicios: exerciciosReducer } });
