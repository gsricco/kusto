import React, {useRef, useState} from 'react'
import AvatarEditor from 'react-avatar-editor'
import {Slider} from './Slider';
import {Button} from 'common/components/Button/Button';
import {ThemeButton} from 'common/enums/themeButton';
import styled from "styled-components";
import {useSaveAvatarMutation} from 'assets/store/api/profile/profileApi';
import fullScreen from '../../public/img/icons/expand-outline.svg'
import zoom from '../../public/img/icons/maximize-outline.svg'
import addPhoto from '../../public/img/icons/image-outline.svg'
import Image from "next/image";
import {baseTheme} from "../../styles/styledComponents/theme";
import PhotoEditorModal from "../profile/PhotoEditorModal";


////  //  Модальное окно редактирования изображения  //  ////

const PostPhotoEditorModal = ({
                                photo,
                                handleEditorClose,
                                handleFullScreen
                              }: {
  photo: File
  handleEditorClose: () => void
  handleFullScreen:(full:boolean)=>void
}) => {

  const [value, setValue] = useState(12) // начальное значение для zoom
  const [openZoom, setOpenZoom] = useState(false)  // начальное значение для rotate
  const [full, setFullScreen] = useState(false)  // начальное значение для rotate

  // const [saveAvatarHandler] = useSaveAvatarMutation()

  const cropRef = useRef<AvatarEditor | null>(null)

  // Сохранение значений в локальный state при перемещении бегунка
  const handleSlider = (setState: (arg: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setState(parseInt(e.target.value))
    }
  }

  // Обработчик сохранени отредактированного изображения
  const handleSave = async () => {

    // подготовка данных
    if (cropRef.current) {
      const avatar = cropRef.current.getImage().toDataURL();

      // преобразование base64 в file
      const result = await fetch(avatar);
      const blob = await result.blob();
      const file = new File([blob], 'avatar', {type: 'image/png'})

      // преобразование file в FormData
      const formData = new FormData()
      formData.append("avatar", file as File)

      try {
        // await saveAvatarHandler(formData)
        //   .unwrap()
        //   .then(() => {
        handleEditorClose()
        // })
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleClickFullScreen = ()=>{
    handleFullScreen(!full);
    setFullScreen(!full);
  }

  return (<>
      <StyledPhotoEditor full={full}>
        <AvatarEditor     // width и height задается в styled component с учетом border
          ref={cropRef}
          image={photo}
          // border={1}
          // borderRadius={158}
          color={[23, 23, 23, 0]}
          scale={value / 10}
          // rotate={rotateAngle}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </StyledPhotoEditor>

      {openZoom && <StyledSliderContainer>
          <label htmlFor="zoom"></label>
          <Slider
              min="10"
              max="50"
              id="zoom"
              onInput={handleSlider(setValue)}
              onChange={handleSlider(setValue)}
              value={value}
              type="range"
              style={{
                width: "80%",
                "--min": 10,
                "--max": 50,
                "--val": value
              }}
          />
      </StyledSliderContainer>}
     {/* <StyledSliderContainer>
        <label htmlFor="rotate">Rotate:</label>
        <Slider
          min="-180"
          max="180"
          id="rotate"
          onInput={handleSlider(setRotateAngle)}
          onChange={handleSlider(setRotateAngle)}
          value={rotateAngle}
          type="range"
          style={{
            width: "80%",
            "--min": -180,
            "--max": 180,
            "--val": rotateAngle
          }}
        />
      </StyledSliderContainer>
      <StyledContainerButton>
        <Button theme={ThemeButton.PRIMARY} width={"86px"} onClick={handleSave}>
          Save
        </Button>
      </StyledContainerButton>*/}
      <div onClick={handleClickFullScreen}>
        <StyledIconFullScreen src={fullScreen} alt={fullScreen}/>
      </div>
      <div onClick={() => setOpenZoom(!openZoom)}>
        <StyledIconZoom src={zoom} alt={zoom}/>
      </div>
      <div onClick={() => alert('Add photo please')}>
        <StyledIconAddPhoto src={addPhoto} alt={addPhoto} full={full}/>
      </div>

    </>
  )
}

// Стили
export default PostPhotoEditorModal

type PhotoEditorPropsType = {
  full:boolean
}
type IconAddPhotoType = {
  full?:boolean
}

const StyledPhotoEditor = styled.div<PhotoEditorPropsType>
  `
    position: absolute;
    // margin:${props=>props.full?'0':' 61px auto'};
    width:${props=>props.full?'100%': '490px'};
    height:${props=>props.full?'': '502px'};

    @media (max-width: 390px) {
      width: 80vw;
      height: 80vw;
      max-width: 340px;
      max-height: 340px;
    }

  `;

const StyledSliderContainer = styled.div
  `
    display: flex;
    justify-content: space-between;
    padding: 5px 30px;
    position: absolute;
    bottom: 100px;
    width: 80%;

    & label {
    }
  `;

const StyledContainerButton = styled.div
  `
    margin-left: auto;
    margin-right: 24px;
  `

const StyledIconFullScreen = styled(Image)
  `
    position: absolute;
    bottom: 16px;
    left: 16px;
    width: 40px;
    height: 40px;
    background: ${baseTheme.colors.dark["300"]};
  `

const StyledIconZoom = styled(StyledIconFullScreen)
  `
    left: 80px;
  `

const StyledIconAddPhoto = styled(StyledIconFullScreen)<IconAddPhotoType>
  `
    left: ${props=>props.full?'95%': '430px'};
  `


