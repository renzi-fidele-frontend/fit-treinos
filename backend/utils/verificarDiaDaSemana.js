/**
 * Verifica o dia da semana
 * @param {*} dia Valor integer de 0 a 6
 */
function verificarDiaDaSemana(dia) {
   switch (dia) {
      case 0:
         return "Dom";
      case 1:
         return "Seg";
      case 2:
         return "Ter";
      case 3:
         return "Qua";
      case 4:
         return "Qui";
      case 5:
         return "Sex";
      case 6:
         return "Sab";
      default:
         return "";
   }
}

module.exports = verificarDiaDaSemana;
