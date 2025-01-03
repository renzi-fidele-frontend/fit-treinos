import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./state/store";
import DetalhesExercicio from "./pages/DetalhesExercicio/DetalhesExercicio";
import ScrollTop from "./components/ScrollTop/ScrollTop";

// Libs
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Exercicios from "./pages/Exercicios/Exercicios";
import Footer from "./components/Footer/Footer";

function App() {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <Header />
            <ScrollTop>
               <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/exercicio/:id" element={<DetalhesExercicio />} />
                  <Route path="/exercicios" element={<Exercicios />} />
               </Routes>
            </ScrollTop>
            <Footer />
         </BrowserRouter>
      </Provider>
   );
}

export default App;
