import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Footer from "./components/Footer/Footer";
import Router from "./router/Router";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./state/store";
// Libs
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Suspense } from "react";
import Preloader from "./components/Preloader/Preloader";
import i18n from "./i18n/i18n";

function App() {
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor} loading={null}>
            <Suspense fallback={<Preloader />}>
               <BrowserRouter>
                  <Header />
                  <ScrollTop>
                     <Router />
                  </ScrollTop>
                  <Footer />
               </BrowserRouter>
            </Suspense>
         </PersistGate>
      </Provider>
   );
}

export default App;
