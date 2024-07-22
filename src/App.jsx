import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./state/store";

// Libs
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route exact path="/" element={<Home />} />
               <Route />
            </Routes>
         </BrowserRouter>
      </Provider>
   );
}

export default App;
