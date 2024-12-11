
import React from "react";
import "./LegendStyle.css";

const legendStyleItems = [
  { material: "Wood", color: "#8B4513" },
  { material: "Steel", color: "#4682B4" },
  { material: "Concrete", color: "#808080" },
  { material: "Glass", color: "#87CEEB" },
  { material: "Brick", color: "#B22222" },
  { material: "Other", color: "#FFD700" },
];

const LegendStyle: React.FC = () => {
  return (
    <div className="legend">
      {legendStyleItems.map((item) => (
        <div key={item.material} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: item.color }}
          ></span>
          {item.material}
        </div>
      ))}
    </div>
  );
};

export default LegendStyle;
