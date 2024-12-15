import { useEffect, useState } from "react";
import "./UrbanAIUploader.css";
import UrbanAIPreview from "./UrbanAIPreview";
import { apiRequest } from "../api";
import { useAuth } from "../AuthContext";

type ImageObject = {
  name: string;
  href: string;
};

export default function UrbanAIUploader() {
  const [uploadedImages, setUploadedImages] = useState<ImageObject[]>([]);
  const { logout } = useAuth();

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

  return (
    <div id="ai-upload-portal">
      <h1>Urban-AI Image Portal</h1>
      <p>
        Directly access our top-of-the-line Artificial Intelligence model
        Urban-AI to get insights that matter to <strong>you</strong>.
      </p>
      {uploadedImages.map((image) => (
        <UrbanAIPreview uploadedImage={image}></UrbanAIPreview>
      ))}
    </div>
  );
}
