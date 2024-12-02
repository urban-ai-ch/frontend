import "./GallerySection.css";
import ExploreButton from "./ExploreButton"; // Import the reusable button
import imgZurich from "../img/Zurich.jpg";
import imgMelbourne from "../img/Melbourne.jpg";
import imgMumbai from "../img/Mumbai.jpg";
import imgCapeTown from "../img/Cape_Town.jpg";
import imgSanFrancisco from "../img/San_Francisco.jpg";
import imgRio from "../img/Rio.jpg";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const GallerySection = () => {
  const images = [
    {
      src: imgZurich,
      alt: "Gallery 1",
      parameter: "Zurich",
      label: "Explore Zurich",
    },
    {
      src: imgMelbourne,
      alt: "Gallery 2",
      parameter: "Melbourne",
      label: "Explore Melbourne",
    },
    {
      src: imgMumbai,
      alt: "Gallery 3",
      parameter: "Mumbai",
      label: "Explore Mumbai",
    },
    {
      src: imgCapeTown,
      alt: "Gallery 4",
      parameter: "Cape Town",
      label: "Explore Cape Town",
    },
    {
      src: imgSanFrancisco,
      alt: "Gallery 5",
      parameter: "San Francisco",
      label: "Explore San Francisco",
    },
    {
      src: imgRio,
      alt: "Gallery 6",
      parameter: "Rio",
      label: "Explore Rio",
    },
  ];

  return (
    <div className="gallery-section">
      <div className="gallery">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <div className="gallery-image-wrapper">
              <img src={image.src} alt={image.alt} />
              <div className="gallery-button">
                <Link to={`/tool?location=${image.parameter}`}>
                  <ExploreButton label={image.label} variant="secondary" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
