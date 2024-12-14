import { useRef, useState } from "react";
import "./UrbanAI.css";
import { apiRequest } from "../api";
import { useAuth } from "../AuthContext";

type ImageObject = {
  name: string;
  href: string;
};

export default function UrbanAI() {
  const { logout } = useAuth();
  const [dragging, setDragging] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [, setUploadedImages] = useState<ImageObject[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);
      setIsUploaded(true);

      // Create local preview URLs for the images
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

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

        const newImages: ImageObject[] = uploadResponse.data;
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

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClosePreview = () => {
    setIsUploaded(false);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      const fileArray = Array.from(droppedFiles);
      setImages(fileArray);
      setIsUploaded(true);
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  return (
    <div id="ai-upload-portal">
      <h1>Urban-AI Image Portal</h1>
      <p>
        Directly access our top-of-the-line Artificial Intelligence model
        Urban-AI to get insights that matter to <strong>you</strong>.
      </p>
      {!isUploaded ? (
        <div
          className="upload-box"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            backgroundColor: dragging ? "rgba(0, 0, 0, 0.3)" : "", // Change the background color on drag
          }}
        >
          <span>Drag image here to upload or...</span>
          <div id="upload-button-box">
            <label htmlFor="upload-button" id="custom-button">
              <i className="fa-solid fa-upload"></i>
            </label>
            <input
              id="upload-button"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            ></input>
          </div>
        </div>
      ) : (
        <div className="upload-box">
          <div className="submission-container">
            <div id="ai-submission-preview">
              <h3>Image preview</h3>
              <button
                onClick={handleClosePreview}
                className="fa-solid fa-xmark"
                id="close-preview-button"
              ></button>
              <div className="preview-images">
                {/* WARNING: The styling of this is in the Input.css file */}
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

            <div className="ai-submission-form">
              <h3>What would you like to know?</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter your question"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                />
                <button disabled={loading || images.length === 0}>
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
