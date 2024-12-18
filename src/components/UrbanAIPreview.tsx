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
  onDelete,
}: {
  uploadedImage: ImageObject;
  onDelete: (imageName: string) => void;
}) {
  const { fetch } = useApi();
  const [output, setOutput] = useState<JSX.Element>(<></>);
  const criteriaRef = useRef<HTMLSelectElement>(null);

  const fetchImageMeta = async () => {
    const response = await fetch(`/images/v1/metadata/${uploadedImage.name}`);
    const metaData: ImageMetaData = await response.json();

    setOutput(
      <>
        metaData.materials ? <p>Materials used: {metaData.materials}</p> : <></>
        metaData.history ? <p>
          Historical data: {metaData.history ?? ""}
        </p> : <></>
        metadata.seismic ?{" "}
        <p>Seismic risk potential: {metaData.seismic ?? ""}</p>
        <></>
      </>
    );
  };

  useEffect(() => {
    fetchImageMeta();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const selectedCriteria = criteriaRef.current?.value as Criteria;
    if (!selectedCriteria) {
      setOutput(
        <p>
          <strong>ERROR: </strong> Invalid analysis criteria
        </p>
      );
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
        setOutput(
          <p>
            <strong>Analysis running...</strong> It will be ready in a few
            minutes. Please reload the page to obtain the results!
          </p>
        );
      } else {
        setOutput(
          <p>
            <strong>ERROR: </strong> Analysis failed
          </p>
        );
        await fetchImageMeta();
      }
    } catch (error) {
      setOutput(
        <p>
          <strong>ERROR: </strong> Unable to process image
        </p>
      );
    }
  };

  return (
    <div className="upload-preview">
      <img src={uploadedImage.href} className="preview-uploaded-image" />
      <div className="button-in-center">
        <form onSubmit={handleFormSubmit} className="image-row-form">
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
          <button type="submit" className="explore-button primary" id="run-ai">
            Run AI
          </button>
        </form>
        <button
          className="delete-button danger"
          onClick={() => onDelete(uploadedImage.name)}
        >
          Delete
        </button>
      </div>
      <div className="ai-output">{output}</div>
    </div>
  );
}
