import { useState } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { MapComponent } from "./MapComponent";

import "./tool.css";

const Tool = ({ defaultLocation }: { defaultLocation: string }) => {
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
    { label: "Mumbai", value: [72.8777, 19.076] },
    { label: "San Francisco", value: [-122.4194, 37.7749] },
    { label: "Rio", value: [-43.1729, -22.9068] },
  ];

  const datasetOptions: DatasetOption[] = [
    { label: "Footprints", value: "footprints.geojson" },
    { label: "Materials", value: "materials.geojson" },
  ];

  const [coordinates, setCoordinates] = useState<[number, number]>(
    getCoordinatesByLabel(defaultLocation) ?? [0, 0] // Default to Zurich
  );

  const [dataset, setDataset] = useState<string | undefined>(undefined);

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
      </div>

      <>
        {console.log(
          "geojson_output/" +
            findLabelByValue(coordinates)?.toLowerCase().replace(/\s/g, "") +
            "_" +
            dataset
        )}
        <MapComponent
          coordinates={coordinates}
          dataset={
            "geojson_output/" +
            findLabelByValue(coordinates)?.toLowerCase().replace(/\s/g, "") +
            "_" +
            dataset
          }
        />
      </>
    </div>
  );
};

export default Tool;
