export function verificarSufixoOrdinalEmIngles(number) {
   const sufixos = ["th", "st", "nd", "rd"];
   const v = number % 100;
   return number + (sufixos[(v - 20) % 10] || sufixos[v] || sufixos[0]);
}
