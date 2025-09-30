/** Traduz de maneira bruta o dia da semana abreviado para o inglês
 * @param {string} diaDaSemana
 */
export function traduzirDiaDaSemana(diaDaSemana) {
   switch (diaDaSemana) {
      case "Seg":
         return "Mon";
      case "Ter":
         return "Tue";
      case "Qua":
         return "Wed";
      case "Qui":
         return "Thu";
      case "Sex":
         return "Fri";
      case "Sab":
         return "Sat";
      case "Dom":
         return "Sun";
      default:
         diaDaSemana;
   }
}
