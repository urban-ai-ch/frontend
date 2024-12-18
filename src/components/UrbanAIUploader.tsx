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
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
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
  }, [fetch]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      setLoading(true);
      setStatusMessage("Uploading...");

      const fileArray = Array.from(files);
      const formData = new FormData();
      fileArray.forEach((image) => formData.append("image", image));

      try {
        const response = await fetch("/images/v1/images", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setStatusMessage("Complete");
          const data: ImageObject[] = await response.json();
          setUploadedImages((prevImages) => [...prevImages, ...data]);
        } else {
          setStatusMessage("Failed to upload");
          console.error("Failed to upload images.");
        }
      } catch (error) {
        setStatusMessage("Error during upload");
        console.error("Upload error:", error);
      } finally {
        setTimeout(() => {
          setStatusMessage("");
        }, 3000);
        setLoading(false);
      }
    }
  };

  const deleteImage = async (imageName: string) => {
    try {
      const response = await fetch(`/images/v1/image/${imageName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStatusMessage("Deleted");
        setUploadedImages((prevImages) =>
          prevImages.filter((image) => image.name !== imageName)
        );
      } else {
        setStatusMessage("Failed to delete");
        console.error("Failed to delete image.");
      }
    } catch (error) {
      setStatusMessage("Error during deletion");
      console.error("Delete error:", error);
    } finally {
      setTimeout(() => {
        setStatusMessage("");
      }, 3000);
      setLoading(false);
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
        disabled={loading}
      ></input>
      <div className="spacer">
        <p className="status-message">{statusMessage}</p>
      </div>
      {uploadedImages.map((image) => (
        <UrbanAIPreview
          key={image.name}
          uploadedImage={image}
          onDelete={deleteImage}
        />
      ))}
    </div>
  );
}
