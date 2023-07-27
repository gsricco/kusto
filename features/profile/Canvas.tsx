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
        // context.drawImage(img,0,0); // Or at whatever offset you like
        if (canvas) {
            const ratio = img.width / img.height;
            newWidth = canvas.width;
            newHeight = newWidth / ratio;
            if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * ratio;
            }
        }
       
        context.drawImage(img,0,0, newWidth , newHeight);
    };
    img.src = photo;
    //Our first draw
    // context.fillStyle = '#000000'
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])
  
  return <canvas ref={canvasRef} width={width} height={height}/>
}

export default Canvas