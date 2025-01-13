/** Fatia o array original de acordo com a página atual e o nr de itens por página. */
export function paginarArray(array = [], paginaAtual = 0, itensPorPagina = 0) {
   const startIndex = (paginaAtual - 1) * itensPorPagina;
   const endIndex = startIndex + itensPorPagina;
   return array?.slice(startIndex, endIndex);
}
