import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

/**
 * Hook que fornece um serviço para calcular rotas entre dois ou mais lugares
 * @returns A Classe DirectionsService e DirectionsRenderer do Routes Library.
 */
const useRoutesService = () => {
   const map = useMap();

   const routesLibrary = useMapsLibrary("routes");
   const [directionsService, setDirectionsService] = useState(null);
   const [directionsRenderer, setDirectionsRenderer] = useState(null);

   useEffect(() => {
      if (!routesLibrary || !map) return;
      setDirectionsService(new routesLibrary.DirectionsService());
      setDirectionsRenderer(new routesLibrary.DirectionsRenderer());
   }, [map, routesLibrary]);

   return { directionsService, directionsRenderer };
};
export default useRoutesService;
