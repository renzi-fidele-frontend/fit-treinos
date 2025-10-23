import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

// Libs
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import AuthModal from "./components/AuthModal/AuthModal";

// TODO: Investigar sobre um jeito de integrar o Google Fit Api de modo a escalar a aplicação de treino
// TODO: Investigar sobre um jeito de integrar os ginásios mais próximos do usuário utilizando o Google Maps Api
function App() {
   return (
      <div className="App">
         <Header />
         <ScrollTop>
            <Outlet />
         </ScrollTop>
         <Footer />
         {/* Modal de autenticação para caso o usuário tente realizar uma ação sensível */}
         <AuthModal />
      </div>
   );
}

export default App;
