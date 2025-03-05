// Converter segundos para formato humano
export const formatarTempo = (segundos) => {
   const minutos = Math.floor(segundos / 60);
   const segundosRestantes = segundos % 60;
   return `${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`;
};
