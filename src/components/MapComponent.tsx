import { useEffect, useRef, useState } from "react";
import { Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import "./MapComponent.css";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
// import { apiRequest } from "../api";

export function MapComponent({
  coordinates,
  dataset,
}: {
  coordinates: [number, number];
  dataset: GeoJSON | undefined;
}) {
  const mapRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);

  const popupRef = useRef<HTMLDivElement | null>(null);
  const [popupText, setPopupText] = useState<JSX.Element[]>([]);

  const DISPLAY_PROPERTIES = [
    "architectu",
    "heritage_s",
    "material",
    "building_c",
    "main_facad",
    "roof",
    "energy_fea",
    "energy_ass",
    "gutters",
    "building_t",
    "pre_domain",
    "ART",
    "ARTZH",
    "BEARBEITUN",
    "BFSNR",
    "EGID",
    "GBAUJ",
    "GBAUP",
    "GVZNUMMER",
    "QUALITAET",
    "STICHTAG",
    "build_year",
    "floors",
    "height",
    "latitude",
    "longitude",
    "area_in_me",
    "SHAPE_Area"
  ];

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

      const popupOverlay = new Overlay({
        element: popupRef.current!,
        positioning: "bottom-center",
        stopEvent: false,
      });

      mapRef.current.addOverlay(popupOverlay);

      // Add click event listener to get feature properties
      mapRef.current.on("singleclick", (event) => {
        mapRef.current?.forEachFeatureAtPixel(event.pixel, async (feature) => {
          const properties = feature.getProperties();

          console.log(properties);

          if (properties) {
            const filteredProperties = Object.entries(properties)
              .filter(([key]) => DISPLAY_PROPERTIES.includes(key))
              .map(([key, value], index) => (
                <div key={index} className="ol-popup-row">
                  <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong>{" "}
                  {value}
                </div>
              ));
            setPopupText(filteredProperties);

            if (properties['Filename']) {
              // const response = await apiRequest<Image>(
              //   `/images/v1/image/${properties['Filename']}`,
              //   {
              //     method: "GET",
              //     headers: {
              //       "Content-Type": "application/json",
              //     },
              //     body: JSON.stringify(payload),
              //   },
              //   logout
              // );
            }
          }
          const c = event.coordinate;
          popupOverlay.setPosition(c);
        });
      });
    } else {
      // Update map view when coordinates change
      mapRef.current.getView().setCenter(fromLonLat(coordinates));
      mapRef.current.getView().setZoom(13);
    }
  }, [coordinates]);

  useEffect(() => {
    if (dataset) {
      const geojsonFormat = new GeoJSON();
      const features = geojsonFormat.readFeatures(dataset, {
        featureProjection: "EPSG:3857",
      });

      var datasetLayer = new VectorLayer({
        source: new VectorSource({
          features: features,
        }),
      });

      mapRef.current?.addLayer(datasetLayer);

      return () => {
        // remove previous layer
        mapRef.current?.removeLayer(datasetLayer);
      };
    }
    return () => {};
  }, [dataset]);

  return (
    <div>
      <div id="map" className="map-container" />
      <div className="popup" ref={popupRef}>
        <div className="popup-title">Properties</div>
        <div className="popup-content">{popupText}</div>
      </div>
    </div>
  );
}
