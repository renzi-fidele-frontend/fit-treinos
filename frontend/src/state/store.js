import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import temaReducer from "./theme/themeSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import exerciciosReducer from "./exercicios/exerciciosSlice";
import configsReducer from "./configs/configsSlice";

// Combinando os reducers
const rootReducer = combineReducers({ exercicios: exerciciosReducer, auth: authReducer, tema: temaReducer, configs: configsReducer });

const persistConfig = {
   key: "root",
   storage,
   blacklist: ["Exercicios"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
