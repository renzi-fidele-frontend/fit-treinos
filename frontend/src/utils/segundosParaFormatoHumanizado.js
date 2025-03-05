export function segundosParaFormatoHumanizado(segundos) {
   if (segundos < 600) {
      const minutos = Math.floor(segundos / 60);
      const seg = segundos % 60;
      return `${String(minutos).padStart(2, "0")}min ${String(seg).padStart(2, "0")}s`;
   } else {
      const horas = Math.floor(segundos / 3600);
      const minutos = Math.floor((segundos % 3600) / 60);
      return `${String(horas).padStart(2, "0")}h ${String(minutos).padStart(2, "0")}min`;
   }
}
