import React, { useState, useEffect, useRef } from "react";
import "./Input.css";
import { apiRequest } from "../api";
import { useAuth } from "../AuthContext";

type ImageObject = {
  name: string;
  href: string;
};

const ImageUploader: React.FC = () => {
  const { logout } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ImageObject[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch the list of uploaded images from the backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await apiRequest<ImageObject[]>(
          "/images/v1/images",
          {},
          logout
        );
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
      const uploadResponse = await apiRequest<ImageObject[]>(
        "/images/v1/images",
        {
          method: "POST",
          body: formData,
        },
        logout
      );

      if (uploadResponse.status === "success" && uploadResponse.data) {
        alert("Images uploaded successfully!");
        setImages([]);
        setPreviewUrls([]);

        const images: ImageObject[] = uploadResponse.data;
        setUploadedImages((prevImages) => [...prevImages, ...images]); // Create a new array
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading images.");
    } finally {
      setLoading(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="image-uploader-container">
      <h1 className="image-uploader-title">Image Uploader</h1>

      {/* Upload Form */}
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
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
