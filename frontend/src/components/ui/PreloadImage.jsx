import { useEffect, useState } from "react";

import Placeholder from "react-bootstrap/Placeholder";

/** Componente que detecta os estados de carregamento de uma imagem
 * @param errorSrc Foto atribuída no caso de erro de carregamento
 * @param preloaderCn Classe atribuida ao placeholder de esqueleto
 */
const PreloadImage = ({ src, errorSrc, className, preloaderCn, alt }) => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   useEffect(() => {
      setLoading(true);
      const img = new Image();
      img.src = src;
      img.onload = () => {
         setLoading(false);
      };
      img.onerror = () => {
         setLoading(false);
         setError(true);
      };
   }, [src]);

   return loading ? (
      <Placeholder xs={12} animation="wave">
         <Placeholder xs={12} className={preloaderCn} />
      </Placeholder>
   ) : error ? (
      <img src={errorSrc} alt={alt} className={className + " card-img"} />
   ) : (
      <img src={src} alt={alt} className={className + " card-img"} />
   );
};
export default PreloadImage;
