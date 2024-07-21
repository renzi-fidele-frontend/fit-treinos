import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";

function App() {
   return (
      <BrowserRouter>
         <Header />
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
