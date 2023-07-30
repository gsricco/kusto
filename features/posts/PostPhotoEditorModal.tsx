import React, {useEffect, useRef, useState} from "react";
import AvatarEditor from "react-avatar-editor";
import {Slider} from "./Slider";
import styled from "styled-components";
import fullScreen from "../../public/img/icons/expand-outline.svg";
import fullScreenOn from "../../public/img/icons/expand.svg";
import zoom from "../../public/img/icons/maximize-outline.svg";
import zoomOn from "../../public/img/icons/maximize.svg";
import addPhoto from "../../public/img/icons/image-outline.svg";
import addPhotoOn from "../../public/img/icons/image.svg";
import plusPhoto from "../../public/img/icons/plus-circle-outline.svg";
import resizePhoto from "../../public/img/icons/photo-resize.svg";
import resizePhotoOn from "../../public/img/icons/photo-resizeOn.svg";
import resize11 from "../../public/img/icons/resize11.svg";
import resize45 from "../../public/img/icons/resize45.svg";
import resize169 from "../../public/img/icons/resize169.svg";
import Image from "next/image";
import {baseTheme} from "../../styles/styledComponents/theme";
import {useCreatePostMutation} from "assets/store/api/posts/postsApi";
import {
  StyledCloseNextButton,
  StyledModalHeaderNext,
  StyledModalTitleNext
} from "../../common/components/Modals/Modal.styled";
import PostPhotoSelectModal from "./PostPhotoSelectModal";
import {Button} from "../../common/components/Button/Button";
import {ThemeButton} from "../../common/enums/themeButton";
import FilterModal from "./FilterModal";
import PostDescriptionModal from "./PostDescriptionModal";

type SmallProtoProps = {
  photo: string;
  removePhotoFromList: (index: number) => void;
  index: number;
};

const SmallPhoto = ({photo, removePhotoFromList, index}: SmallProtoProps) => {
  return (
    <>
      <AvatarEditor // width и height задается в styled component с учетом border
        image={photo}
        style={{
          width: "90px",
          height: "90px",
          left: "30px",
          top: "10px"
        }}
      />
      <StyleDeletePhoto onClick={() => {
        removePhotoFromList(index)
      }}>
        <Image priority src="/img/icons/close_white.svg" height={24} width={24} alt="close"/>
      </StyleDeletePhoto>
    </>
  );
};


type SizePhotoType = {
  width:string
  height:string
}


const PostPhotoEditorModal = ({
                                photo,
                                handleEditorClose,
                                handleFullScreen,
                                photoPost1,
                                handleFilterOpen,
                              }: {
  photo: File;
  handleEditorClose: () => void;
  handleFullScreen: (full: boolean) => void;
  photoPost1: string[];
  handleFilterOpen: (editPhotoList: string[]) => void;
}) => {
  const [value, setValue] = useState(12); // начальное значение для zoom
  const [openZoom, setOpenZoom] = useState(false); // начальное значение для rotate
  const [openAddPhoto, setOpenAddPhoto] = useState(false); // начальное значение для rotate
  const [openComp, setOpenComp] = useState(false); // начальное значение для rotate
  const [full, setFullScreen] = useState(false);
  const [resize, setResize] = useState(false);
  const [photoPost, setPhotoPost] = useState<string[]>(photoPost1 || []);
  const [isFilterOpen, setIsFilterOpen] = useState(false) // открытие модального окна для наложения фильтров
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false) // открытие модального окна для описания поста

  const sizePhotoProps = {width:'90vh',height:'90vh'}

  const [sizePhoto, setSizePhoto] = useState<SizePhotoType>(sizePhotoProps || {width:'90vh',height:'90vh'});

  const [createPostHandler] = useCreatePostMutation();

  const cropRef = useRef<AvatarEditor | null>(null);

  // const create = () => {
  //   const formData = new FormData();
  //   formData.append("description", "dsgasdg dsagsda gsda g");
  //   photoPost.map((photo) => formData.append("posts", photo as File));

  //   createPostHandler(formData);
  // };

  // Сохранение значений в локальный state при перемещении бегунка
  const handleSlider = (setState: (arg: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target) {
        setState(parseInt(e.target.value));
      }
    };

  // Обработчик сохранени отредактированного изображения
  const handleSave = async () => {
    // подготовка данных
    if (cropRef.current) {
      const avatar = cropRef.current.getImage().toDataURL();

      // преобразование base64 в file
      const result = await fetch(avatar);
      const blob = await result.blob();
      const file = new File([blob], "avatar", {type: "image/png"});

      // преобразование file в FormData
      const formData = new FormData();
      formData.append("avatar", file as File);
      // setPhotoPost((prev) => [...prev, file]);

      const newList = [...photoPost, avatar]
      setPhotoPost(newList)
      debugger
      try {

      } catch (error) {
        console.log(error);
      }
    }
  };

  const removePhotoFromList = (index: number) => {
    const newPhotoList = [];
    for (let i = 0; i < photoPost.length; i++) {
      if (index === i) {
        continue;
      } else {
        newPhotoList.push(photoPost[i]);
      }
    }
    setPhotoPost(newPhotoList);
  };

  const handleClickFullScreen = () => {
    handleFullScreen(!full);
    setFullScreen(!full);
  };

  const handleNextToFilterButton = () => {
    setOpenComp(false)
    setIsFilterOpen(true)
  }

  const handleNextToPublishButton = () => {
    setIsDescriptionOpen(true)
    setIsFilterOpen(false)
  }

  const handleBackToEditor = (photoPost: string[]) => {
    setOpenComp(false)
    setIsFilterOpen(false)
    setPhotoPost(photoPost)
  }

  const handleBackToFilters = (photoPost: string[]) => {
    setIsFilterOpen(true)
    setIsDescriptionOpen(false)
    setPhotoPost(photoPost)
  }

  return (
    <>
      {openComp
        ? <PostPhotoSelectModal
          handleModalClose={() => {
          }}
          avatar={""}
          handleFullScreen={handleFullScreen}
          isHeaderOpen={false}
          isHeader2Open={true}
          photoPostProps={photoPost}
        />
        : <>
          <StyledModalHeaderNext>
            <StyledCloseNextButton onClick={() => alert("handleModalBack")}>
              <Image
                priority
                src="/img/icons/arrow-ios-back.svg"
                height={24}
                width={24}
                alt="close"
              />
            </StyledCloseNextButton>
            <StyledModalTitleNext>{"Cropping"}</StyledModalTitleNext>
            <Button theme={ThemeButton.CLEAR} onClick={handleNextToFilterButton}>
              Next
            </Button>
          </StyledModalHeaderNext>
          <StyledPhotoEditor full={full}>
            <AvatarEditor // width и height задается в styled component с учетом border
              ref={cropRef}
              image={photo}
              color={[23, 23, 23, 0]}
              scale={value / 10}
              style={{
                width: full ? "90vh" : sizePhoto.width,
                height: full ? "90vh" : sizePhoto.height,
                left: "30px"
              }}
            />
          </StyledPhotoEditor>
          {openZoom && (
          <StyledSliderContainer>
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
                width: "45%",
                "--min": 10,
                "--max": 50,
                "--val": value
              }}
            />
          </StyledSliderContainer>
          )}
          {resize && (
            <StyledResizeBlock>
              <StyleItemSize onClick={()=>setSizePhoto({width:'90%', height:'90%'})}>
                <StyledIconSize src={addPhoto} alt={fullScreen}/> <span>original</span>
              </StyleItemSize>
              <StyleItemSize onClick={()=>setSizePhoto({width:'90%', height:'90%'})}>
                <StyledIconSize src={resize11} alt={fullScreen}/>1:1
              </StyleItemSize>
              <StyleItemSize onClick={()=>setSizePhoto({width:'40%', height:'50%'})}>
                <StyledIconSize src={resize45} alt={fullScreen}/>4:5
              </StyleItemSize>
              <StyleItemSize onClick={()=>setSizePhoto({width:'90%', height:'50%'})}>
                <StyledIconSize src={resize169} alt={fullScreen}/>16:9
              </StyleItemSize>
            </StyledResizeBlock>
          )}
          {openAddPhoto && (
            <StyledAddBlock>
              <StyledPhotoPost id={"scrollable-container"}>
                {photoPost.map((photo, index) => (
                  <SmallPhoto
                    photo={photo}
                    key={index}
                    index={index}
                    removePhotoFromList={removePhotoFromList}
                  />
                ))}
              </StyledPhotoPost>
              <div onClick={() => setOpenComp(true)}>
                <StyledIconPlusPhoto src={plusPhoto} alt={fullScreen}/>
              </div>
            </StyledAddBlock>
          )}
          <div onClick={handleClickFullScreen}>
            <StyledIconFullScreen src={full ? fullScreenOn : fullScreen} alt={fullScreen}/>
          </div>

          <div onClick={() => setResize(!resize)}>
            <StyledIconResize src={resize ? resizePhotoOn : resizePhoto} alt={fullScreen}/>
          </div>


          <div onClick={() => setOpenZoom(!openZoom)}>
            <StyledIconZoom src={!openZoom ? zoom : zoomOn} alt={zoom}/>
          </div>
          <div
            onClick={() => {
              setOpenAddPhoto(!openAddPhoto);
              if(!openAddPhoto) {
                handleSave();
              }
            }}
          >
            <StyledIconAddPhoto
              src={!openAddPhoto ? addPhoto : addPhotoOn}
              alt={addPhoto}
              full={full}
            />
          </div>
        </>
      }
      {isFilterOpen && (
        <FilterModal handleBackToEditor={handleBackToEditor} handleNextToPublishButton={handleNextToPublishButton} photoPost={photoPost}/>
      )}
      {isDescriptionOpen && (
        <PostDescriptionModal handleBackToFilters = {handleBackToFilters} handleModalClose={handleEditorClose} photoPost={photoPost}/>
      )}
    </>
  );
};

// Стили
export default PostPhotoEditorModal;

type PhotoEditorPropsType = {
  full: boolean;
};
type IconAddPhotoType = {
  full?: boolean;
};

const StyledPhotoEditor = styled.div<PhotoEditorPropsType>`
  position: absolute;
    // margin:${(props) => (props.full ? "0" : " 61px auto")};
  width: ${(props) => (props.full ? "100%" : "490px")};
  height: ${(props) => (props.full ? "" : "502px")};
  top: 62px;
  display: flex;
  justify-content: center;

  @media (max-width: 390px) {
    width: 80vw;
    height: 80vw;
    max-width: 340px;
    max-height: 340px;
  }
`;

const StyledPhotoPost = styled.div`
  position: absolute;
  width: 152px;
  height: 106px;
  //bottom: 60px;
  //right: 20px;
  background: ${baseTheme.colors.dark["300"]};
  //opacity: 0.7;
  display: flex;
  overflow-x: scroll;
  z-index: 100;
`;

const StyledSliderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
  position: absolute;
  bottom: 100px;
  left: 50px;
  width: 80%;

  & label {
  }
`;
//
// const StyledContainerButton = styled.div`
//   margin-left: auto;
//   margin-right: 24px;
// `;


const StyleItemSize = styled.div
`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${baseTheme.colors.light["900"]};
  
  & span{
    color:${baseTheme.colors.light["100"]};
  }

`


const StyledIconSize = styled(Image)
`
  width: 26px;
  height: 26px;
  background: ${baseTheme.colors.dark["100"]};
`

const StyledIconFullScreen = styled(Image)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  background: ${baseTheme.colors.dark["100"]};
`;

const StyledIconZoom = styled(StyledIconFullScreen)`
  left: 80px;
`;

const StyledIconAddPhoto = styled(StyledIconFullScreen)<IconAddPhotoType>`
  left: ${(props) => (props.full ? "95%" : "430px")};
`;
const StyledIconResize = styled(StyledIconZoom)
  `
  left: 140px;
`;





const StyledIconPlusPhoto = styled(Image)`
  position: absolute;
  width: 40px;
  background: none;
  margin: 5px 5px;
  right: 0;
`;

const StyledAddBlock = styled.div`
  position: absolute;
  width: 200px;
  height: 106px;
  background: ${baseTheme.colors.dark["300"]};
  bottom: 60px;
  right: 18px;
  z-index: 2;
  opacity: 0.7;
`;

const StyledResizeBlock = styled(StyledAddBlock)`
  position: absolute;
  padding: 5px;
  width: 100px;
  height: 140px;
  background: ${baseTheme.colors.dark["100"]};
  bottom: 60px;
  left: 80px;
  z-index: 2;
  opacity: 1;
  
`;



const StyleDeletePhoto = styled.button`
  position: relative;
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  right: 21px;
  bottom: 32px;
`;
