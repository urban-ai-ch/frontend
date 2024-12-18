import { useEffect, useRef, useState } from "react";
import { Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import "./MapComponent.css";
import { fromLonLat, transform } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { createFeatureStyle } from "./MapStyles";

export function MapComponent({
  coordinates,
  dataset,
  datasetName,
	useDefaultColor,
  onStreetView,
}: {
  coordinates: [number, number];
  dataset: GeoJSON | undefined;
  datasetName: string | null;
	useDefaultColor: boolean;
  onStreetView: (location: [number, number]) => void;
}) {
  const mapRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);

  const popupRef = useRef<HTMLDivElement | null>(null);
  const [popupText, setPopupText] = useState<JSX.Element[]>([]);
  const [popOverlay, setPopOverlay] = useState<Overlay | null>(null);
  const [clickCoords, setClickCoords] = useState<[number, number] | null>(null);

  const DISPLAY_PROPERTIES: Record<string, string> = {
    "architectu": "Architecture",
    "heritage_s": "Heritage Status",
    "material": "Material",
    "building_c": "Building Condition",
    "main_facad": "Main Facade",
    "roof": "Roof Type",
    "energy_fea": "Energy Features",
    "energy_ass": "Energy Assessment",
    "gutters": "Gutters",
    "building_t": "Building Type",
    "pre_domain": "Previous Domain",
    "ART": "Art Category",
    "ARTZH": "Art Subcategory",
    "BEARBEITUN": "Processing Information",
    "BFSNR": "Federal Statistical Number",
    "EGID": "Building ID",
    "GBAUJ": "Construction Year",
    "GBAUP": "Construction Period",
    "GVZNUMMER": "Property Number",
    "QUALITAET": "Data Quality",
    "STICHTAG": "Effective Date",
    "build_year": "Build Year",
    "floors": "Number of Floors",
    "height": "Building Height",
    "latitude": "Latitude",
    "longitude": "Longitude",
    "area_in_me": "Area in Square Meters",
    "SHAPE_Area": "Shape Area"
  }
  

  const hidePopup = () => {
    popOverlay?.setPosition(undefined);
  };

  // Display map
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
    } else {
      // Update map view when coordinates change
      mapRef.current.getView().setCenter(fromLonLat(coordinates));
      mapRef.current.getView().setZoom(13);
    }
  }, [coordinates]);

  // Handle clicks on the map
  useEffect(() => {
    if (popupRef.current && mapRef.current) {
      const popupOverlay = new Overlay({
        element: popupRef.current,
        positioning: "bottom-center",
        stopEvent: true,
      });

      mapRef.current.addOverlay(popupOverlay);
      setPopOverlay(popupOverlay);

      mapRef.current.on("singleclick", (event) => {
        let featureFound = false;

        const c = event.coordinate;
        const [lon, lat] = transform(c, "EPSG:3857", "EPSG:4326");
        if (lon && lat) setClickCoords([lat, lon]);

        mapRef.current?.forEachFeatureAtPixel(event.pixel, (feature) => {
          featureFound = true;
          const properties = feature.getProperties();

          if (properties) {
            const filteredProperties = Object.entries(properties)
              .filter(([key]) => key in DISPLAY_PROPERTIES) // Check if the key exists in the json object
              .map(([key, value], index) => (
                <div key={index} className="popup-row">
                  <strong>{DISPLAY_PROPERTIES[key as keyof typeof DISPLAY_PROPERTIES]}:</strong> {value}
                </div>
              ));
          
            setPopupText(filteredProperties);
          }
          popupOverlay.setPosition(event.coordinate);
          
          
        });

        if (!featureFound) {
          setPopupText([
            <div key="no-data" className="popup-row">
              <strong>Notice:</strong> No data available for this location.
              Would you like to access Google Maps StreetView?
            </div>,
          ]);
          popupOverlay.setPosition(event.coordinate);
        }
      });
    }
  }, [popupRef]);

  // Display datasets
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
        style: (feature) =>
          datasetName ? createFeatureStyle(feature, datasetName, useDefaultColor) : undefined, // Apply external dynamic style
      });

      mapRef.current?.addLayer(datasetLayer);

      return () => {
        // remove previous layer
        mapRef.current?.removeLayer(datasetLayer);
      };
    }
    return () => {};
  }, [dataset, datasetName, useDefaultColor]);

  return (
    <div>
      <div id="map" className="map-container" />
      <div className="popup" ref={popupRef}>
        <div className="popup-title">
          <button onClick={hidePopup} className="fa-solid fa-xmark"></button>
          <div id="popup-title-text">Properties</div>
        </div>
        <div className="popup-content">
          <div>{popupText}</div>
          <button
            className="streetview-button"
            onClick={() => onStreetView([clickCoords![0], clickCoords![1]])}
          >
            Google Street View
          </button>
        </div>
      </div>
    </div>
  );
}
