import { useEffect, useState } from "react";
import "./UrbanAIUploader.css";
import UrbanAIPreview from "./UrbanAIPreview";
import { useApi } from "../ApiContext";

type ImageObject = {
  name: string;
  href: string;
};

export default function UrbanAIUploader() {
  const [uploadedImages, setUploadedImages] = useState<ImageObject[]>([]);
  const [, setLoading] = useState(false);
  const { fetch } = useApi();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/images/v1/images");
        if (response.ok) {
          const data: ImageObject[] = await response.json();
          setUploadedImages(data);
        } else {
          console.error("Failed to fetch images.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const formData = new FormData();
      fileArray.forEach((image) => formData.append("image", image));

      try {
        const response = await fetch("/images/v1/images", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Images uploaded successfully!");

          const data: ImageObject[] = await response.json();
          const newImages: ImageObject[] = data;
          setUploadedImages((prevImages) => [...prevImages, ...newImages]); // Create a new array
        } else {
          alert("Failed to upload image.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("An error occurred while uploading images.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div id="ai-upload-portal">
      <h1>Urban-AI Image Portal</h1>
      <p>
        Directly access our top-of-the-line Artificial Intelligence model
        Urban-AI to get insights that matter to <strong>you</strong>.
      </p>
      <label htmlFor="upload-button" id="custom-button">
        <i className="fa-solid fa-upload"></i>
      </label>
      <input
        id="upload-button"
        type="file"
        multiple
        accept="image/png, image/jpeg"
        onChange={handleUpload}
      ></input>
      {uploadedImages.map((image) => (
        <UrbanAIPreview uploadedImage={image}></UrbanAIPreview>
      ))}
    </div>
  );
}
