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

function App() {
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor} loading={null}>
            <BrowserRouter>
               <Header />
               <ScrollTop>
                  <Router />
               </ScrollTop>
               <Footer />
            </BrowserRouter>
         </PersistGate>
      </Provider>
   );
}

export default App;
