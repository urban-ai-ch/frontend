import { Style, Fill, Stroke, Circle } from "ol/style";

// Function to get colors based on material type
export const getMaterialColor = (material: string): string => {
    const materialColors: { [key: string]: string } = {
        plaster: "#FFD700", // Vibrant Gold for Plaster
        concrete: "#5A5A5A", // Darker Gray for Concrete
        glass: "#00BFFF", // Deeper Sky Blue for Glass
        brick: "#FF4500", // Bright Red-Orange for Brick
        metal: "#8A2BE2", // Vivid Purple for Metal
        stone: "#1b8401", // Lime Green for Stone
        wood: "#A0522D", // Reddish-Brown for Wood
        stucco: "#c1ff7c", // Medium Spring Green for Stucco
        other: "#ffffff", // White for other materials
    };
  
    // Ensure we always return a string by explicitly falling back to 'other'
    return materialColors[material.toLowerCase()] ??  "#ffffff"; // Gold for other materials
  };
  

// Function to create dynamic styles for features
export const createFeatureStyle = (feature: any) => {
  const material = feature.get("material") || feature.get("main_facad") || "other"; // Default to 'other' if material is missing
  const color = getMaterialColor(material);

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
