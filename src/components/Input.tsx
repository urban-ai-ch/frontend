import React, { useState, useEffect } from "react";
import "./Input.css";
import { apiRequest } from "../api";

type ImagesResponse = {
  name: string;
  href: string;
}[];

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ImagesResponse>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch the list of uploaded images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await apiRequest<ImagesResponse>("/images/v1/images");
        if (response.status === "success" && response.data) {
          setUploadedImages(response.data);
        } else {
          console.error("Failed to fetch images.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Handle file input changes and generate preview URLs
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);

      // Create local preview URLs for the images
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  // Handle form submission to upload images to the backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    images.forEach((image) => formData.append("image", image)); // Append each image to the FormData object

    try {
      const uploadResponse = await apiRequest("/images/v1/image", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (uploadResponse.status === "success") {
        alert("Images uploaded successfully!");
        setImages([]);
        setPreviewUrls([]);

        //TODO: dont pull but "calculate" the new uploadedImages locally
        const imagesResponse =
          await apiRequest<ImagesResponse>("/images/v1/images");
        if (imagesResponse.status === "success" && imagesResponse.data)
          setUploadedImages(imagesResponse.data);
      } else {
        alert("Failed to upload images.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-uploader-container">
      <h1 className="image-uploader-title">Image Uploader</h1>

      {/* Upload Form */}
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/jpeg, image/png" // Accept both JPG and PNG images
          multiple
          onChange={handleFileChange}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Images"}
        </button>
      </form>

      {/* Preview Section */}
      <div className="preview-section">
        <h3>Preview</h3>
        <div className="preview-images">
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Preview ${index}`}
              className="preview-image"
            />
          ))}
        </div>
      </div>

      {/* Uploaded Images Section */}
      <div className="uploaded-images-section">
        <h3>Uploaded Images</h3>
        <ul className="uploaded-images-list">
          {uploadedImages.map((image) => (
            <li key={image.name}>
              <a href={image.href} target="_blank" rel="noopener noreferrer">
                {image.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;
