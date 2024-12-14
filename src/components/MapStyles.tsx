import { Style, Fill, Stroke, Circle } from "ol/style";

// Function to get colors based on material type
export const getMaterialColor = (material: string, datasetName: string): string => {
    const materialColors: { [key: string]: { [key: string]: string }} = {
      materials: {
        plaster: "#FFD700", // Vibrant Gold for Plaster
        concrete: "#5A5A5A", // Darker Gray for Concrete
        glass: "#00BFFF", // Deeper Sky Blue for Glass
        brick: "#FF4500", // Bright Red-Orange for Brick
        metal: "#8A2BE2", // Vivid Purple for Metal
        stone: "#1b8401", // Lime Green for Stone
        wood: "#A0522D", // Reddish-Brown for Wood
        stucco: "#c1ff7c", // Medium Spring Green for Stucco
        other: "#ffffff", // White for other materials
      },
      footprints: {
        unknown: "#6699ff", // Black for unknown footprints
      },
      default: {
        unknown: "#808080", // White for unknown materials
      }
    };

  
    // Ensure we always return a string by explicitly falling back to 'other'
    return (materialColors[datasetName.toLowerCase()]?.[material.toLowerCase()] || 
    materialColors[datasetName.toLowerCase()]?.["other"] || 
    materialColors["default"]?.["unknown"] ||
    "#000000"); // Fallback black if no match is found 
  };
  

// Function to create dynamic styles for features
export const createFeatureStyle = (feature: any, datasetName: string) => {
  const normalizedDatasetName = datasetName.toLowerCase();
  const propertyKey =
  normalizedDatasetName === "materials"
    ? "material"
    : normalizedDatasetName === "footprints"
    ? "building_footprint" // Placeholder for the "Footprints" property
    : "unknown";

  const material =
    feature.get(propertyKey) || // Try the primary key first
    (normalizedDatasetName === "materials" ? feature.get("main_facad") : null) || // Fallback for "materials"
    "unknown"; // Default value


  const color = getMaterialColor(material, normalizedDatasetName);

  return new Style({
    fill: new Fill({
      color: `${color}88`, // Semi-transparent fill
    }),
    stroke: new Stroke({
      color: color,
      width: 1,
    }),
    image: new Circle({
      radius: 5,
      fill: new Fill({ color }),
      stroke: new Stroke({ color: "#000", width: 1 }),
    }),
  });
};
