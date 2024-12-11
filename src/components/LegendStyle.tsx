import React, { useState } from "react";
import "./LegendStyle.css";

const legendStyleItems = [
  { material: "Plaster", color: "#FFD700" },
  { material: "Concrete", color: "#5A5A5A" },
  { material: "Glass", color: "#00BFFF" },
  { material: "Brick", color: "#FF4500" },
  { material: "Metal", color: "#8A2BE2" },
  { material: "Stone", color: "#1b8401" },
  { material: "Wood", color: "#A0522D" },
  { material: "Stucco", color: "#c1ff7c" },
  { material: "Others", color: "#ffffff" },
];

const LegendStyle: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="legend-container">
      <button
        className="toggle-legend-button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide Material Legend" : "Show Material Legend"}
      </button>
      {isVisible && (
        <div className="legend">
          <div className="legend-items">
          {/* <div className="legend-title">Material Legend: </div> */}
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
        </div>
      )}
    </div>
  );
};

export default LegendStyle;
