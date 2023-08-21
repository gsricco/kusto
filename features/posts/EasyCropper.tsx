import Cropper from 'react-easy-crop'
import { useState, useCallback, useEffect } from 'react'

const EasyCroppe = ({photoFileURL, zoomTo, aspectRatio = 1, isObjectFit}: {
    photoFileURL: string
    // setCroppedAreaPixels: (image: CropArgType | null) => void
    zoomTo: number
    aspectRatio: number
    isObjectFit: boolean
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArgType | null>(null)

    useEffect(() => {  
        setZoom(zoomTo)        
    })

    let objectFit: 'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover' = 'vertical-cover'
    if (isObjectFit) {
        objectFit = 'contain'
    }
    const onCropComplete = useCallback((croppedArea: CropArgType, croppedAreaPixels: CropArgType) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

  return (
    <Cropper
      image={photoFileURL}
      crop={crop}
      zoom={zoom}
      aspect={aspectRatio}
      objectFit={objectFit}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      
    />
  )
}

export default EasyCroppe

export type CropArgType = {
    x: number, // x/y are the coordinates of the top/left corner of the cropped area
    y: number,
    width: number, // width of the cropped area
    height: number, // height of the cropped area
  }