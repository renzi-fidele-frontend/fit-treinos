import { Pagination } from "react-bootstrap";
import { gerarArray } from "../../utils/gerarArray";

// TODO: Melhorar a paginação para que mostre no máximo 9 páginas
const Paginacao = ({ onPageClick, paginaAtual, totalPaginas }) => {
   return (
      <Pagination className="flex-wrap justify-content-center">
         {gerarArray(totalPaginas).map((v, k) => (
            <Pagination.Item
               active={v === paginaAtual}
               onClick={() => {
                  onPageClick(v);
               }}
               key={k}
            >
               {v}
            </Pagination.Item>
         ))}
      </Pagination>
   );
};
export default Paginacao;
