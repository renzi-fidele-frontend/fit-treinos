import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Preloader from "./components/Preloader/Preloader.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./state/store";
import Router from "./router/Router.jsx";
// Configuração da internacionalização
import i18n from "./i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate persistor={persistor} loading={null}>
            <Suspense fallback={<Preloader />}>
               <Router />
            </Suspense>
         </PersistGate>
      </Provider>
   </React.StrictMode>
);
