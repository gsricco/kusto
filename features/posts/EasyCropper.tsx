import Cropper from 'react-easy-crop'
import { useState, useCallback, useEffect } from 'react'
import getCroppedImg from './cropImage'

const EasyCroppe = ({photoFileURL, setCroppedAreaPixels, zoomTo}: {
    photoFileURL: string
    setCroppedAreaPixels: (image: CropArgType | null) => void
    zoomTo: number
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArgType | null>(null)
//   const [croppedImage, setCroppedImage] = useState<string | null>(null)
    useEffect(() => {  
        setZoom(zoomTo)
        // showCroppedImage()
    })
  const onCropComplete = useCallback((croppedArea: CropArgType, croppedAreaPixels: CropArgType) => {
    setCroppedAreaPixels(croppedAreaPixels)

    // setSavedImageUrl(croppedArea)
  }, [])


//   const showCroppedImage = useCallback(async () => {
//     try {
//         if (croppedAreaPixels) {
//             const croppedImage = await getCroppedImg(
//             photoFileURL,
//             croppedAreaPixels,
//             // rotation
//             )
//             console.log('donee', { croppedImage })
//             setCroppedImage(croppedImage)
//             // setSavedImageUrl(croppedImage)

//         }
      
//     } catch (e) {
//       console.error(e)
//     }
//   }, [croppedAreaPixels])

  return (
    <Cropper
      image={photoFileURL}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
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