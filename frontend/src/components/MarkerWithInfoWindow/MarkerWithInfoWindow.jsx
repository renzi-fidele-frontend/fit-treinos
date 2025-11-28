import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useState } from "react";
import styles from "./MarkerWithInfoWindow.module.css"

const MarkerWithInfoWindow = ({ position, titulo }) => {
   const [markerRef, marker] = useAdvancedMarkerRef();
   const [infoWindowShown, setInfoWindowShown] = useState(false);

   return (
      <AdvancedMarker className={styles.marker} onClick={() => setInfoWindowShown((prevState) => !prevState)} position={position} ref={markerRef}>
         <Pin background={"#ffee00ff"} borderColor={"#000000ff"} glyphColor={"#000000ff"} />
         {infoWindowShown && (
            <InfoWindow headerContent={<h6 className="mb-0">{titulo}</h6>} anchor={marker} onClose={() => setInfoWindowShown(false)}></InfoWindow>
         )}
      </AdvancedMarker>
   );
};
export default MarkerWithInfoWindow;
