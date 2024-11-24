import React, {useState} from "react";
import ImageUploader from "./Components/ImageUploader";
import Slideshow from "./Components/Slideshow";

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [interval, setInterval] = useState<number>(5);

  const handleUpload = (uploadedImages: string[], intervalTime:number) => {
    setImages(uploadedImages);
    setInterval(intervalTime);
  };

  return (
    <div>
    
      {images.length === 0 ? (
        <ImageUploader onUpload={handleUpload} />
      ):(
        <Slideshow images={images} interval={interval} />
      )}
    </div>
  )
}

export default App;