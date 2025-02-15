import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import DetalhesExercicio from "../pages/DetalhesExercicio/DetalhesExercicio";
import Exercicios from "../pages/Exercicios/Exercicios";
import Cadastro from "../pages/Cadastro/Cadastro";
import Login from "../pages/Login/Login";
import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard/Dashboard";

const Router = () => {
   const { user } = useSelector((state) => state.auth);

   return (
      <Routes>
         <Route exact path="/" element={<Home />} />
         <Route path="/exercicio/:id" element={<DetalhesExercicio />} />
         <Route path="/exercicios" element={<Exercicios />} />
         <Route path="/cadastro" element={!user ? <Cadastro /> : <Navigate to="/" />} />
         <Route path="/entrar" element={!user ? <Login /> : <Navigate to="/" />} />
         <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/entrar" />} />
      </Routes>
   );
};
export default Router;
