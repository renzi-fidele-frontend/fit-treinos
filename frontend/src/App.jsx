import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./state/store";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Footer from "./components/Footer/Footer";
import Router from "./router/Router";

// Libs
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// TODO: No backend, instalar o passport e passport-local para autenticação
// TODO: Adicionar dashboard de rastreamento do treino
// TODO: Guardar o usuário logado no local storage

function App() {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <Header />
            <ScrollTop>
               <Router />
            </ScrollTop>
            <Footer />
         </BrowserRouter>
      </Provider>
   );
}

export default App;
