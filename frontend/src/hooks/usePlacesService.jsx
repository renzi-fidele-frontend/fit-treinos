import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function usePlacesService() {
   const map = useMap();
   const placesLibrary = useMapsLibrary("places");
   const [placesService, setPlacesService] = useState(null);

   useEffect(() => {
      if (!placesLibrary || !map) return;

      // when placesLibrary is loaded, the library can be accessed via the
      // placesLibrary API object
      setPlacesService(new placesLibrary.PlacesService(map));
   }, [placesLibrary, map]);

   return placesService;
}

export default usePlacesService;
