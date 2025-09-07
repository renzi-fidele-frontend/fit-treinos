/** Renderiza a prévia no componente de imagem sempre que se carrega uma foto ao input field. */
export function renderizarPrevia(fotoPreviaRef, uploadInputRef) {
   const reader = new FileReader();
   reader.onloadend = () => {
      fotoPreviaRef.current.src = reader.result;
   };
   reader.readAsDataURL(uploadInputRef.current.files[0]);
}
