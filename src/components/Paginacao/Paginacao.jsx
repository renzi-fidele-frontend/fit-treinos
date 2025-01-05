import { Pagination } from "react-bootstrap";
import { gerarArray } from "../../utils/gerarArray";

const Paginacao = ({ onPageClick, paginaAtual, totalPaginas }) => {
   return (
      <Pagination className="">
         {gerarArray(totalPaginas).map((v, k) => (
            <Pagination.Item key={k}>{v + 1}</Pagination.Item>
         ))}
      </Pagination>
   );
};
export default Paginacao;
