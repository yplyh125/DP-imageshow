import React, { useState } from "react";
import ImageUploader from "./Components/ImageUploader";
import Slideshow from "./Components/Slideshow";

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [interval, setInterval] = useState<number>(5);

  const handleUpload = (uploadedImages: string[], intervalTime: number) => {
    setImages(uploadedImages);
    setInterval(intervalTime);
  };

  return (
    <div
      style={{
        width: "100vw", // 전체 화면 너비
        height: "100vh", // 전체 화면 높이
        overflow: "hidden", // 화면 밖 요소 숨김
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {images.length === 0 ? (
        <ImageUploader onUpload={handleUpload} />
      ) : (
        <Slideshow images={images} interval={interval} />
      )}
    </div>
  );
};

export default App;
