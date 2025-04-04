import { useState, useEffect } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { MapComponent } from "./MapComponent";
import LegendStyle from "./LegendStyle";
import "./Tool.css";
import GeoJSON from "ol/format/GeoJSON";
import StreetViewComponent from "./StreetViewComponent";
import { useJsApiLoader } from "@react-google-maps/api";
import { useApi } from "../ApiContext";

const Tool = ({ defaultLocation }: { defaultLocation: string }) => {
  const { fetch } = useApi();

  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewLocation, setStreetViewLocation] = useState<
    [number, number] | null
  >(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC-sEXK5ybaOtt-4PezxrpHsjVvgjRIafE",
  });

  const handleStreetView = (location: [number, number]) => {
    setStreetViewLocation(location);
    setShowStreetView(true);
  };

  const handleButtonClick = () => {
    setShowStreetView(false);
  };

  interface LocationOption {
    label: string;
    value: [number, number]; // Tuple for longitude and latitude
  }

  interface DatasetOption {
    label: string;
    value: string;
  }

  const findLabelByValue = (value: [number, number]): string | undefined => {
    const option = locationOptions.find(
      (option) => option.value[0] === value[0] && option.value[1] === value[1]
    );
    return option?.label; // Return the label or undefined if not found
  };

  const getCoordinatesByLabel = (
    label: string
  ): [number, number] | undefined => {
    const location = locationOptions.find((option) => option.label === label);
    return location?.value;
  };

  const locationOptions: LocationOption[] = [
    { label: "Zurich", value: [8.5417, 47.3769] },
    { label: "Cape Town", value: [18.4241, -33.9249] },
    { label: "Melbourne", value: [144.9631, -37.8136] },
    { label: "Mumbai", value: [72.83166209034103, 18.96438166928156] },
    { label: "San Francisco", value: [-122.4194, 37.7749] },
    { label: "Rio", value: [-43.1729, -22.9068] },
  ];

  const datasetOptions: DatasetOption[] = [
    { label: "Footprints", value: "footprints.geojson" },
    { label: "Materials", value: "materials.geojson" },
  ];

  const [coordinates, setCoordinates] = useState<[number, number]>(
    getCoordinatesByLabel(defaultLocation) ?? [0, 0]
  );

  const [dataset, setDataset] = useState<string | null>(null);
  const [geoJSON, setGeoJSON] = useState<GeoJSON | null>(null);
  // const [address, setAddress] = useState<string>('');

  // Function to fetch GeoJSON data
  const fetchGeoJSON = async (
    coordinates: [number, number],
    dataset: string | undefined
  ) => {
    const label = findLabelByValue(coordinates)
      ?.toLowerCase()
      .replace(/\s/g, "");
    if (!label || !dataset) {
      console.error("Invalid coordinates or dataset");
      setGeoJSON(null);
      return;
    }

    try {
      const response = await fetch(`/geojson/v1/geojson/${label}_${dataset}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data: GeoJSON = await response.json();
        setGeoJSON(data);
      } else {
        console.error("Failed to fetch GeoJSON:", response.statusText);
        setGeoJSON(null);
        return;
      }
    } catch (error) {
      console.error("Error fetching GeoJSON:", error);
      setGeoJSON(null);
    }
  };

	const [useDefaultColor, setUseDefaultColor] = useState(false); // State to toggle colors
	const toggleColoring = () => {
    setUseDefaultColor((prev) => !prev);
  };

  // UseEffect to fetch GeoJSON whenever coordinates or dataset change
  useEffect(() => {
    if (coordinates && dataset) {
      fetchGeoJSON(coordinates, dataset);
    }
  }, [coordinates, dataset]);

  return (
    <div className="tool-container">
      <div className="filter-menu">
        <DropdownMenu
          name="city"
          options={locationOptions}
          placeholder="Choose a city..."
          onChange={(newCoords: [number, number]) => setCoordinates(newCoords)}
          enabled={showStreetView}
        />
        <DropdownMenu
          name="dataset"
          options={datasetOptions}
          placeholder="Choose a dataset..."
          onChange={(newDataset: string) => setDataset(newDataset)}
          enabled={showStreetView}
        />
				<button className="toggle-coloring-button" onClick={toggleColoring}>
          {useDefaultColor ? "Enable Specific Material Coloring" : "Disable Specific Material Coloring"}
        </button>
        {/* <InputButton label="Input" to="/Input" variant="primary" /> */}
        <LegendStyle /> {/* Add the LegendStyle component here */}
      </div>
      {isLoaded && showStreetView && streetViewLocation ? (
        <div className="super-container">
          <StreetViewComponent
            lat={streetViewLocation[0]}
            lon={streetViewLocation[1]}
          />
          <button className="return-to-map-button" onClick={handleButtonClick}>
            Back to map
          </button>
        </div>
      ) : (
        <>
          <MapComponent
            coordinates={coordinates}
            dataset={geoJSON ?? undefined}
            datasetName={
              datasetOptions.find((option) => option.value === dataset)
                ?.label ?? "Default"
            }
						useDefaultColor={useDefaultColor}
            onStreetView={handleStreetView}
          />
        </>
      )}
    </div>
  );
};

export default Tool;
