import React, { useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import "./MapComponent.css";

interface StreetViewProps {
  lat: number;
  lon: number;
}

const StreetViewComponent: React.FC<StreetViewProps> = ({ lat, lon }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: 'AIzaSyC-sEXK5ybaOtt-4PezxrpHsjVvgjRIafE',
  });

  const panoramaRef = useRef<HTMLDivElement | null>(null);

  const center = {
    lat: lat,
    lng: lon,
  };

  useEffect(() => {
    if (isLoaded && panoramaRef.current) {
      const streetViewPanorama = new google.maps.StreetViewPanorama(panoramaRef.current, {
        position: center,
        pov: {
          heading: 165,
          pitch: 0,
        },
        visible: true,
        panControl: false,
        linksControl: false, 
        fullscreenControl: false, 
      });


      google.maps.event.addListener(streetViewPanorama, 'pano_changed', () => {
        console.log('New Panorama Pano ID:', streetViewPanorama.getPano());
      });


      google.maps.event.addListener(streetViewPanorama, 'status_changed', () => {
        const status = streetViewPanorama.getStatus();
        console.log('Panorama status:', status);
      });

      // Optional: Return cleanup function to remove event listener and street view when component unmounts
      return () => {
        google.maps.event.clearInstanceListeners(streetViewPanorama);
      };
    }
    return undefined;
  }, [isLoaded, center]);

  return isLoaded ? (
    <div className="map-container" ref={panoramaRef}></div>
  ) : (
    <div>Loading...</div>
  );
};

export default StreetViewComponent;
