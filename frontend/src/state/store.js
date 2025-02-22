import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exerciciosReducer from "./exercicios/exerciciosSlice";
import authReducer from "./auth/authSlice";
import temaReducer from "./theme/themeSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Combinando os reducers
const rootReducer = combineReducers({ exercicios: exerciciosReducer, auth: authReducer, tema: temaReducer });

const persistConfig = {
   key: "root",
   storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
