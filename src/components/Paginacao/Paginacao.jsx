import { Pagination } from "react-bootstrap";
import { gerarArray } from "../../utils/gerarArray";

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
