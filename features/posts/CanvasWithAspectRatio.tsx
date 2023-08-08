import {FC, useEffect, useRef, useState} from "react";


type FrameType = {
  width: number;
  height: number;
}

type CanvasWithAspectRatioProps = {
  photo: string;
  width: number;
  height: number;
  frame: FrameType;
  setImageUrl: (canvasUrl: string) => void;
  scale: number;
}
let arrPhotos:string[] = new Array()
const CanvasWithAspectRatio: FC<CanvasWithAspectRatioProps> = ({
                                                                 photo,
                                                                 width,
                                                                 height,
                                                                 frame: {width: frameWidth, height: frameHeight},
                                                                 setImageUrl,
                                                                 scale,
                                                               }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  const saveImage = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      const img = new Image();
      img.onload = function () {
        const newWidth = frameWidth * scale;
        const newHeight = frameHeight * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, newWidth, newHeight);

        const canvasUrl = canvas.toDataURL();
        setImageUrl(canvasUrl);
        console.log(photo)
        console.log('save', canvasUrl)
      };

      img.src = photo;

    }
  };




  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');

    const img = new Image();
    img.onload = function () {
      const imageAspectRatio = img.width / img.height;

      let newWidth, newHeight;

      // Выберите нужное соотношение сторон (4:5 или 16:9)


      const targetAspectRatio = frameWidth / frameHeight;  //4 / 5; // Или 16 / 9

      if (imageAspectRatio > targetAspectRatio) {
        // Ширина изображения больше - ограничиваем по высоте
        newHeight = canvas!.height * scale;
        newWidth = newHeight * imageAspectRatio;
      } else {
        // Высота изображения больше - ограничиваем по ширине
        newWidth = canvas!.width * scale;
        newHeight = newWidth / imageAspectRatio;
      }

      const xOffset = (canvas!.width - newWidth) / 2;
      const yOffset = (canvas!.height - newHeight) / 2;

      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      context!.drawImage(img, xOffset, yOffset, newWidth, newHeight);

      const canvasUrl = canvas!.toDataURL();
      setImageUrl(canvasUrl);

    };

    img.src = photo;
  }, [scale]);

  // console.log('scale', scale)


  return <>
    <canvas ref={canvasRef} width={width * scale} height={height * scale}/>
  </>


};

export default CanvasWithAspectRatio;