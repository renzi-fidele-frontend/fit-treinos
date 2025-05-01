import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import temaReducer from "./theme/themeSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import exerciciosReducer from "./exercicios/exerciciosSlice";
import configsReducer from "./configs/configsSlice";
import languageReducer from "./language/languageSlice";

// Combinando os reducers
const rootReducer = combineReducers({
   exercicios: exerciciosReducer,
   auth: authReducer,
   tema: temaReducer,
   configs: configsReducer,
   idioma: languageReducer,
});

const persistConfig = {
   key: "root",
   storage,
   blacklist: ["exercicios", "idioma"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
