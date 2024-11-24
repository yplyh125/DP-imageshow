import React, {useEffect, useState} from "react";

interface SlidershowProps {
  images: string[];
  interval: number;
}

const Slideshow: React.FC<SlidershowProps> = ({images, interval}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);

  useEffect(()=>{
    const timer = setInterval(()=> {
      setFade(false);
      setTimeout(()=> {
        setCurrentIndex((prevIndex)=>(prevIndex+1)%images.length);
        setFade(true);
      },500)
      
    },interval * 1000);

    return () => clearInterval(timer)
  },[images,interval]);

  return (
    <div
     style={{
      position:"relative",
      width:"100vW",
      height:"100vh", overflow:"hidden"
    }}>
      <img src={images[currentIndex]}
       alt={`slide-${currentIndex}`}
        style={{
          position:"absolute",
          top:0,
          left:0,
          width:'100%', 
          height:"100%", 
          objectFit:"cover",
          opacity: fade ? 1 : 0, 
          transition: "opacity 0.5s ease-in-out",}} />
    </div>
  )
};

export default Slideshow;