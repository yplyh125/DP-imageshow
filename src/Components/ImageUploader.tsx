import React, {useState} from "react";

interface ImageUploaderProps {
  onUpload: (images:string[], interval:number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({onUpload}) => {
  const [images, setImages] = useState<string[]>([]);
  const [interval, setInterval] = useState<number>(5);

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files){
      const files = Array.from(e.target.files).map((file)=> URL.createObjectURL(file));
      setImages(files);
    }
  }

  const handleSubmit = () => {
    if (images.length > 0){
      onUpload(images,interval)
    }
  }

  return (
    <div>
      <h3>사진 업로드 및 설정</h3>
      <div style={{marginTop:"5vw"}}>
        <label htmlFor="image">사진 설정: </label>
        <input type="file" id="image" multiple onChange={handleImageChange} accept="image/*"></input>
      </div>
      <div style={{margin:"5vw 0"}}>
        <label htmlFor="time">초 설정: </label>
        <input type="number"  id="time" value={interval} onChange={(e)=> setInterval(Number(e.target.value))} placeholder="전환 시간(초)" />
      </div>
      <button onClick={handleSubmit}>슬라이드 쇼 시작</button>
    </div>
  )
}

export default ImageUploader;