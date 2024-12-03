import { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import "./MapComponent.css";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export function MapComponent({
  coordinates,
  dataset,
}: {
  coordinates: [number, number];
  dataset: GeoJSON | undefined;
}) {
  const mapRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Create a vector source for markers
      const markerVectorSource = new VectorSource();
      vectorSourceRef.current = markerVectorSource;

      // Initialize the map
      mapRef.current = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: markerVectorSource,
            zIndex: 1000, // Ensure markers appear in front
          }),
        ],
        target: "map",
        view: new View({
          center: fromLonLat(coordinates),
          zoom: 13,
        }),
      });

      // Add click event listener to get feature properties
      // mapRef.current.on("singleclick", (event) => {

      //   mapRef.current?.forEachFeatureAtPixel(event.pixel, (feature) => {
      //   const properties = feature.getProperties();

      //   // const popup = new Overlay({
      //   //   element: document.getElementById('popup'),
      //   // });
      //   // mapRef.addOverlay(popup);


      //   console.log(properties);
      //   });

      // });
    } else {
      // Update map view when coordinates change
      mapRef.current.getView().setCenter(fromLonLat(coordinates));
      mapRef.current.getView().setZoom(13);
    }
  }, [coordinates]);


  useEffect(() => {
    if (dataset) {
      const datasetLayer = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(dataset, {
            featureProjection: 'EPSG:3857', // Ensure the projection matches your map
          }),
        }),
      });

      mapRef.current?.addLayer(datasetLayer);

      return () => {
        // remove previous layer
        mapRef.current?.removeLayer(datasetLayer);
      };
    }
    return () => { };
  }, [dataset]);

  return <div id="map" className="map-container" />;
}
