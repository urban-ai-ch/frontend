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
  return (
    <div className="upload-preview">
      <img src={uploadedImage.href} className="preview-uploaded-image" />
      bla
    </div>
  );
}
