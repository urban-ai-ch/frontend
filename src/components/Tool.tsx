import { useState, useEffect } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { MapComponent } from "./MapComponent";
import InputButton from "./InputButton";

import "./Tool.css";
import { apiRequest } from "../api";
import { useAuth } from "../AuthContext";
import GeoJSON from "ol/format/GeoJSON";
import StreetViewComponent from "./StreetViewComponent";

const Tool = ({ defaultLocation }: { defaultLocation: string }) => {
  const { logout } = useAuth();

  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewLocation, setStreetViewLocation] = useState<
    [number, number] | null
  >(null);

  const handleStreetView = (location: [number, number]) => {
    setStreetViewLocation(location);
    setShowStreetView(true);
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

  // Geocoding is more complicated than I thought...

  // const getCoordinatesByAddress = async () => {

  //   try {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
  //     );

  //     const data = await response.json();
  //     if (data.length > 2) {
  //       const { lat, lon } = data[0];
  //       setCoordinates([parseFloat(lon), parseFloat(lat)])
  //     } else {
  //       alert('Address not found!')
  //     }
  //   } catch (error) {
  //     console.error('Error when trying to convert address to coords', error);
  //   }
  // }

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     getCoordinatesByAddress();
  //   }
  // };

  const locationOptions: LocationOption[] = [
    { label: "Zurich", value: [8.5417, 47.3769] },
    { label: "Cape Town", value: [18.4241, -33.9249] },
    { label: "Melbourne", value: [144.9631, -37.8136] },
    { label: "Mumbai", value: [72.8777, 19.076] },
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
      const response = await apiRequest<GeoJSON>(
        `/geojson/v1/geojson/${label}_${dataset}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        logout
      );

      if (response.status === "success" && response.data) {
        setGeoJSON(response.data);
      } else {
        console.error("Failed to fetch GeoJSON:", response.message);
        setGeoJSON(null);
        return;
      }
    } catch (error) {
      console.error("Error fetching GeoJSON:", error);
      setGeoJSON(null);
    }
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
        />
        <DropdownMenu
          name="dataset"
          options={datasetOptions}
          placeholder="Choose a dataset..."
          onChange={(newDataset: string) => setDataset(newDataset)}
        />
        <InputButton label="Input" to="/Input" variant="primary" />
        {/* <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={handleKeyDown}
        /> */}
      </div>
      {showStreetView && streetViewLocation ? (
        <StreetViewComponent lat={streetViewLocation[0]} lon={streetViewLocation[1]} />
      ) : (
        <>
          <MapComponent
            coordinates={coordinates}
            dataset={geoJSON ?? undefined}
            onStreetView={handleStreetView}
          />
        </>
      )}
    </div>
  );
};

export default Tool;
