import translate from "translate";

export async function traduzirTexto(texto) {
   const texto_traduzido = await translate(texto, "pt");
   return texto_traduzido;
}
