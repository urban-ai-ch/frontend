import React, { useState, useEffect } from "react";
import "./Input.css";

type ImagesResponse = {
  name: string;
  href: string;
}[];

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ImagesResponse>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/images/v1/images");
        if (response.ok) {
          const data: ImagesResponse = await response.json();
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);

      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    images.forEach((image) => formData.append("image", image));

    try {
      const response = await fetch("/images/v1/image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Images uploaded successfully!");
        setImages([]);
        setPreviewUrls([]);

        const refreshedImages = await fetch("/images/v1/images").then((res) =>
          res.json()
        );
        setUploadedImages(refreshedImages);
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

      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/jpeg"
          multiple
          onChange={handleFileChange}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Images"}
        </button>
      </form>

      <div className="preview-section">
        <h3>Preview</h3>
        <div className="preview-images">
          {previewUrls.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index}`} />
          ))}
        </div>
      </div>

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
