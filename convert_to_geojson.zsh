#!/bin/zsh

INPUT_DIR="."
OUTPUT_DIR="./geojson_output"

mkdir -p "$OUTPUT_DIR"

for SHP_FILE in "$INPUT_DIR"/*.shp; do
  BASE_NAME=$(basename "$SHP_FILE" .shp)
  
  GEOJSON_FILE="$OUTPUT_DIR/$BASE_NAME.geojson"
  
  echo "Converting $SHP_FILE to $GEOJSON_FILE with EPSG:3857 projection..."
  ogr2ogr -f "GeoJSON" -t_srs "EPSG:3857" "$GEOJSON_FILE" "$SHP_FILE"
done

echo "All shapefiles have been converted to GeoJSON with EPSG:3857 and saved in $OUTPUT_DIR!"
