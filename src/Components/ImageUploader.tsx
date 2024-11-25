import React, { useState } from "react";

interface ImageUploaderProps {
  onUpload: (images: string[], interval: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [images, setImages] = useState<string[]>([]);
  const [interval, setInterval] = useState<number>(5);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages(files);
    }
  };

  const handleSubmit = () => {
    if (images.length > 0) {
      onUpload(images, interval);
    }
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h3 style={{ fontSize: 50 }}>사진 업로드 및 설정</h3>
      <div style={{ marginTop: "5vw" }}>
        <label htmlFor="image" style={{ fontSize: 30 }}>
          사진 설정:{" "}
        </label>
        <input
          type="file"
          id="image"
          multiple
          onChange={handleImageChange}
          accept="image/*"
          style={{ fontSize: 30 }}
        ></input>
        <br />
        <label htmlFor="image" style={{ fontSize: 20, color: "red" }}>
          유의사항: 사진을 선택하고 넣을 때, ctrl으로 한번에 사진을 넣어야 한다
        </label>
      </div>
      <div style={{ margin: "5vw 0" }}>
        <label htmlFor="time" style={{ fontSize: 30 }}>
          초 설정:{" "}
        </label>
        <input
          type="number"
          id="time"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          placeholder="전환 시간(초)"
          style={{ fontSize: 30 }}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{
          fontSize: 30,
          background: "green",
          color: "white",
          fontWeight: "bold",
        }}
      >
        슬라이드 쇼 시작
      </button>
    </div>
  );
};

export default ImageUploader;
