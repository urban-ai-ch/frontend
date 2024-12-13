import React, { useEffect, useRef, useState } from "react";
import "./MapComponent.css";

interface StreetViewProps {
  lat: number;
  lon: number;
}

const StreetViewComponent: React.FC<StreetViewProps> = ({ lat, lon }) => {
  const panoramaRef = useRef<HTMLDivElement | null>(null);
  const [hasPanorama, setHasPanorama] = useState<boolean>(true);

  const center = {
    lat: lat,
    lng: lon,
  };

  useEffect(() => {
    if (panoramaRef.current) {
      const streetViewService = new google.maps.StreetViewService();
      const streetViewPanorama = new google.maps.StreetViewPanorama(
        panoramaRef.current,
        {
          position: center,
          pov: {
            heading: 165,
            pitch: 0,
          },
          visible: true,
          panControl: false,
          linksControl: false,
          fullscreenControl: false,
        }
      );

      streetViewService.getPanorama(
        { location: center, radius: 50 },
        (_, status) => {
          if (status === google.maps.StreetViewStatus.OK) {
            streetViewPanorama.setPosition(center);
            setHasPanorama(true);
          } else {
            setHasPanorama(false);
          }
        }
      );

      // Optional: Return cleanup function to remove event listener and street view when component unmounts
      return () => {
        google.maps.event.clearInstanceListeners(streetViewPanorama);
      };
    }
    return undefined;
  }, [center]);

  return hasPanorama ? (
    <div ref={panoramaRef} className="map-container"></div>
  ) : (
    <div>No Street View available at this location.</div>
  );
};

export default StreetViewComponent;
