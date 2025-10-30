/** Formata a data para o formato DD/MM/YYYY
 */
export function formatarData(data) {
   const date = new Date(data);
   const yyyy = date.getFullYear();
   let mm = date.getMonth() + 1; // Pois o mês inicia em 0
   let dd = date.getDate();

   if (dd < 10) dd = `0${dd}`;
   if (mm < 10) mm = `0${mm}`;

   const dataFormatada = `${dd}/${mm}/${yyyy}`;

   return dataFormatada;
}
