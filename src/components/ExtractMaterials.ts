import GeoJSON from "ol/format/GeoJSON";



// Function to extract and list all unique materials in the GeoJSON
export function listAllMaterials(geoJsonObject: any): string[] {
  const geojsonFormat = new GeoJSON();
  const features = geojsonFormat.readFeatures(geoJsonObject); // Convert GeoJSON to OpenLayers features

  // Use a Set to collect all unique materials
  const materialSet = new Set<string>();

  features.forEach((feature) => {
    const material = feature.get("material"); // Replace "material" with the exact property name in your dataset
    if (material) {
      materialSet.add(material); // Add the material to the Set
    }
  });

  return Array.from(materialSet); // Convert the Set to an Array
}
