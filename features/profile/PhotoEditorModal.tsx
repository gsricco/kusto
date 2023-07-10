import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Slider } from './Slider';
import { Button } from 'common/components/Button/Button';
import { ThemeButton } from 'common/enums/themeButton';

const PhotoEditorModal = ({photo, handleEditorClose}: {
  photo: File
  handleEditorClose: (image: string) => void 
}) => {

  const [value, setValue] = useState(10);
  const [rotateAngle, setRotateAngle] = useState(0);
  
  const cropRef = useRef<AvatarEditor | null>(null)

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setValue(parseInt(e.target.value))
      console.log(value)
    }
  }

  const handleRotate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setRotateAngle(parseInt(e.target.value))
      console.log(rotateAngle)
    }
  }

  const handleSave = () => {
    if (cropRef.current) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      console.log(dataUrl)
      handleEditorClose(dataUrl)
    }
  };

  return (<>
  <AvatarEditor
      ref={cropRef}
      image={photo}
      width={316}
      height={316}
      border={12}
      borderRadius={158}
      color={[255, 255, 255, 0.6]} // RGBA
      scale={value/10}      
      rotate={rotateAngle}

    />
    <Slider
      min="10"
      max="50"
      id="zoom"
      onInput={handleSlider}
      onChange={handleSlider}
      value={value}
      type="range"
      style={{
        width: "80%",
        "--min": 10,
        "--max": 50,
        "--val": value
      }}
    />
    <label htmlFor="zoom">Zoom</label>

    <Slider
      min="-180"
      max="180"
      id="rotate"
      onInput={handleRotate}
      onChange={handleRotate}
      value={rotateAngle}
      type="range"
      style={{
        width: "80%",
        "--min": -180,
        "--max": 180,
        "--val": rotateAngle
      }}
    />
    <label htmlFor="zoom">Rotate</label>
     
    <Button theme={ThemeButton.PRIMARY} onClick={handleSave}>
      Save
    </Button>
  </>
    
  )
}

export default PhotoEditorModal