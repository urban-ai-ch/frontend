import { useState } from "react";
import "./UrbanAIPreview.css";

type ImageObject = {
  name: string;
  href: string;
};

export default function UrbanAIPreview({
  uploadedImage,
}: {
  uploadedImage: ImageObject;
}) {
  const [output, setOutput] = useState<string>("output here");

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // TODO: run the AI on the image
    // setOutput(result)
  };

  return (
    <div className="upload-preview">
      <img src={uploadedImage.href} className="preview-uploaded-image" />
      <form onSubmit={handleFormSubmit} className="image-row">
        <select name="ai-input" id="ai-input" className="ai-input">
          <option value="materials">Materials</option>
          <option value="historical-value">Historical value</option>
          <option value="seismic-risk-potential">Seismic risk potential</option>
        </select>
        <button type="submit" className="explore-button primary">Run AI</button>
      </form>
      <div className="ai-output">{output}</div>
    </div>
  );
}
