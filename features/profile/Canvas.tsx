import React, { useRef, useEffect } from 'react'

const Canvas = ({photo, filter, width, height} : {photo: string, filter : string, width: string, height: string}) => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D

    const img = new Image;
    context.filter = filter
    img.onload = function(){
        let newWidth = 0
        let newHeight = 0
        let xOffset = 0
        let yOffset = 0
        if (canvas) {
            const ratio = img.width / img.height;
            newWidth = canvas.width;
            newHeight = newWidth / ratio;
            if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * ratio;
            }
            xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
            yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

        }
        context.drawImage(img, xOffset, yOffset, newWidth , newHeight);
    };
    img.src = photo;
  }, [])
  
  return <canvas ref={canvasRef} width={width} height={height}/>
}

export default Canvas