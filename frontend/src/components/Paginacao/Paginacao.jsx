import Pagination from "react-bootstrap/Pagination"
import { gerarArray } from "../../utils/gerarArray";

const Paginacao = ({ onPageClick, paginaAtual, totalPaginas }) => {
   function processarPaginacao() {
      if (paginaAtual < 5) return [1, 5];
      else if (paginaAtual > totalPaginas - 5) return [totalPaginas - 6, totalPaginas - 1];
      else {
         return [paginaAtual - 3, paginaAtual + 2];
      }
   }

   return totalPaginas < 8 ? (
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
   ) : (
      <Pagination className="justify-content-center flex-wrap">
         <Pagination.Item active={1 === paginaAtual} onClick={() => onPageClick(1)}>
            1
         </Pagination.Item>
         {paginaAtual > 4 && <Pagination.Ellipsis onClick={() => onPageClick(1)} />}
         {gerarArray(totalPaginas)
            .slice(...processarPaginacao())
            .map((v) => (
               <>
                  <Pagination.Item active={v === paginaAtual} onClick={() => onPageClick(v)}>
                     {v}
                  </Pagination.Item>
               </>
            ))}
         {paginaAtual < totalPaginas - 4 && <Pagination.Ellipsis onClick={() => onPageClick(totalPaginas)} />}
         <Pagination.Item active={totalPaginas === paginaAtual} onClick={() => onPageClick(totalPaginas)}>
            {totalPaginas}
         </Pagination.Item>
      </Pagination>
   );
};
export default Paginacao;
