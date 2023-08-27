import { FC, useEffect, useRef } from 'react'

type FrameType = {
  width: number
  height: number
}

type CanvasWithAspectRatioProps = {
  photo: string
  width: number
  height: number
  frame: FrameType
  scale: number
  saveImage: (canvasUrl: string) => void
}

const CanvasWithAspectRatio: FC<CanvasWithAspectRatioProps> = ({
  photo,
  width,
  height,
  frame: { width: frameWidth, height: frameHeight },
  scale,
  saveImage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas!.getContext('2d')
    const img = new Image()

    img.onload = function () {
      const imageAspectRatio = img.width / img.height
      let newWidth, newHeight
      const targetAspectRatio = frameWidth / frameHeight // Выбор нужного соотношение сторон (4:5 или 16:9)

      console.log(imageAspectRatio, targetAspectRatio)

      if (imageAspectRatio > targetAspectRatio) {
        // Ширина изображения больше - ограничиваем по высоте
        newHeight = canvas!.height * scale
        newWidth = newHeight * imageAspectRatio
      } else {
        // Высота изображения больше - ограничиваем по ширине
        newWidth = canvas!.width * scale
        newHeight = newWidth / imageAspectRatio
      }

      const xOffset = (canvas!.width - newWidth) / 2
      const yOffset = (canvas!.height - newHeight) / 2

      context!.clearRect(0, 0, canvas!.width, canvas!.height)
      context!.drawImage(img, xOffset, yOffset, newWidth, newHeight)

      const canvasUrl = canvas!.toDataURL()
      saveImage(canvasUrl)
    }

    img.src = photo
  }, [scale])

  return <canvas ref={canvasRef} width={width * scale} height={height * scale} />
}

export default CanvasWithAspectRatio
