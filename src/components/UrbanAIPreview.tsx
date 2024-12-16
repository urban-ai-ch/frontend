import { useEffect, useRef, useState } from "react";
import "./UrbanAIPreview.css";
import { useApi } from "../ApiContext";

type ImageObject = {
  name: string;
  href: string;
};

type DetectionPayload = {
  imageName: string;
  criteria: Criteria;
};

type Criteria = "materials" | "history" | "seismic";
type ImageMetaData = {
  [key in Criteria]?: string;
};

export default function UrbanAIPreview({
  uploadedImage,
}: {
  uploadedImage: ImageObject;
}) {
  const { fetch } = useApi();
  const [output, setOutput] = useState<string>("output here");
  const criteriaRef = useRef<HTMLSelectElement>(null);
  const fetchImageMeta = async () => {
    const response = await fetch(`/images/v1/metadata/${uploadedImage.name}`);
    const metaData: ImageMetaData = await response.json();

    setOutput(
      `Materials used: ${metaData.materials}
      \n
      History data: ${metaData.history}
      \n
      Seismic risk rating: ${metaData.seismic}`
    );
  };

  useEffect(() => {
    fetchImageMeta();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const selectedCriteria = criteriaRef.current?.value as Criteria;
    if (!selectedCriteria) {
      setOutput("No analysis criteria selected");
      return;
    }

    const payload: DetectionPayload = {
      imageName: uploadedImage.name,
      criteria: selectedCriteria,
    };

    try {
      const response = await fetch("/ai/v1/detection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
      } else {
        await fetchImageMeta();
      }
    } catch (error) {
      setOutput("Error: Unable to process the image.");
    }
  };

  return (
    <div className="upload-preview">
      <img src={uploadedImage.href} className="preview-uploaded-image" />
      <form onSubmit={handleFormSubmit} className="image-row">
        <select
          name="ai-input"
          id="ai-input"
          className="ai-input"
          ref={criteriaRef}
        >
          <option value="materials">Materials</option>
          <option value="history">Historical value</option>
          <option value="seismic">Seismic risk potential</option>
        </select>
        <button type="submit" className="explore-button primary">
          Run AI
        </button>
      </form>
      <div className="ai-output">{output}</div>
    </div>
  );
}
