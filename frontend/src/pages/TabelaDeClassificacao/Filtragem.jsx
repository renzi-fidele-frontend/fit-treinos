import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { setFiltro, setOrdem } from "../../state/leaderboard/leaderboardSlice";

const Filtragem = ({ setMostrarModal }) => {
   const { filtro, ordem } = useSelector((state) => state.leaderboard);
   const dispatch = useDispatch();

   return (
      <div className="d-flex gap-0 gap-xl-3 align-items-center flex-column flex-xl-row">
         {/* Filtros */}
         <h5 className="mb-0">Filtrar por: </h5>
         <Nav
            className="justify-content-center"
            variant="pills"
            defaultActiveKey={filtro}
            onSelect={(filtroSelecionado) => dispatch(setFiltro(filtroSelecionado))}
            onClick={() => setMostrarModal(false)}
         >
            <Nav.Item className="border rounded">
               <Nav.Link eventKey="tempo_de_treino">Tempo de treino</Nav.Link>
            </Nav.Item>
            <Nav.Item className="border rounded">
               <Nav.Link eventKey="treinos">Treinos realizados</Nav.Link>
            </Nav.Item>
            <Nav.Item className="border rounded">
               <Nav.Link eventKey="data_de_cadastro">Data de cadastro</Nav.Link>
            </Nav.Item>
         </Nav>
         {/* Separador */}
         <div className="vr d-none d-xl-block"></div>
         {/* Ordem */}
         <h5 className="d-xl-none mt-3">Ordem: </h5>
         <Nav
            className="ordem"
            variant="pills"
            defaultActiveKey={ordem}
            onSelect={(ordemSelecionada) => dispatch(setOrdem(ordemSelecionada))}
            onClick={() => setMostrarModal(false)}
         >
            <Nav.Item className="border rounded">
               <Nav.Link eventKey="decrescente">
                  <i className="bi bi-sort-down"></i>
               </Nav.Link>
            </Nav.Item>
            <Nav.Item className="border rounded">
               <Nav.Link eventKey="crescente">
                  <i className="bi bi-sort-up"></i>
               </Nav.Link>
            </Nav.Item>
         </Nav>
      </div>
   );
};

export default Filtragem;
