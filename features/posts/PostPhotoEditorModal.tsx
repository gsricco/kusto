import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "./Slider";
import styled from "styled-components";
import fullScreen from "../../public/img/icons/expand-outline.svg";
import fullScreenOn from "../../public/img/icons/expand.svg";
import zoom from "../../public/img/icons/maximize-outline.svg";
import zoomOn from "../../public/img/icons/maximize.svg";
import addPhoto from "../../public/img/icons/image-outline.svg";
import addPhotoOn from "../../public/img/icons/image.svg";
import plusPhoto from "../../public/img/icons/plus-circle-outline.svg";
import Image from "next/image";
import { baseTheme } from "../../styles/styledComponents/theme";
import { useCreatePostMutation } from "assets/store/api/posts/postsApi";
import {
  StyledCloseButton,
  StyledCloseNextButton,
  StyledModalHeaderNext,
  StyledModalTitleNext
} from "../../common/components/Modals/Modal.styled";
import PostPhotoSelectModal from "./PostPhotoSelectModal";
import { Button } from "../../common/components/Button/Button";
import { ThemeButton } from "../../common/enums/themeButton";

type SmallProtoProps = {
  photo: File;
  removePhotoFromList: (index: number) => void;
  index: number;
};

const SmallPhoto = ({ photo, removePhotoFromList, index }: SmallProtoProps) => {
  return (
    <>
      <AvatarEditor // width и height задается в styled component с учетом border
        // ref={cropRef}
        image={photo}
        // border={1}
        // borderRadius={158}
        // color={[23, 23, 23, 0]}
        // scale={value / 10}
        // rotate={rotateAngle}
        style={{
          width: "90px",
          height: "90px",
          left: "30px",
          top: "10px"
        }}
      />{" "}
      <StyleDeletePhoto
        onClick={() => {
          removePhotoFromList(index);
        }}
      >
        <Image priority src="/img/icons/close_white.svg" height={24} width={24} alt="close" />
      </StyleDeletePhoto>
    </>
  );
};

const PostPhotoEditorModal = ({
  photo,
  handleEditorClose,
  handleFullScreen,
  photoPost1
}: {
  photo: File;
  handleEditorClose: () => void;
  handleFullScreen: (full: boolean) => void;
  photoPost1: File[];
}) => {
  const [value, setValue] = useState(12); // начальное значение для zoom
  const [openZoom, setOpenZoom] = useState(false); // начальное значение для rotate
  const [openAddPhoto, setOpenAddPhoto] = useState(false); // начальное значение для rotate
  const [openComp, setOpenComp] = useState(false); // начальное значение для rotate
  const [full, setFullScreen] = useState(false);
  const [photoPost, setPhotoPost] = useState<File[]>(photoPost1 || []);

  const [createPostHandler] = useCreatePostMutation();

  const cropRef = useRef<AvatarEditor | null>(null);

  const create = () => {
    const formData = new FormData();
    formData.append("description", "dsgasdg dsagsda gsda g");
    photoPost.map((photo) => formData.append("posts", photo as File));

    createPostHandler(formData);
  };

  // Сохранение значений в локальный state при перемещении бегунка
  const handleSlider =
    (setState: (arg: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const file = new File([blob], "avatar", { type: "image/png" });

      // преобразование file в FormData
      const formData = new FormData();
      formData.append("avatar", file as File);
      // console.log("@@@@@", formData.get("avatar"), file);
      setPhotoPost((prev) => [...prev, file]);

      try {
        // await saveAvatarHandler(formData)
        //   .unwrap()
        //   .then(() => {
        // handleEditorClose();
        // })
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

  return (
    <>
      {openComp ? (
        <>
          {/*<StyledModalHeaderNext>*/}
          {/*  <StyledCloseNextButton onClick={() => alert("handleModalBack")}>*/}
          {/*    <Image*/}
          {/*      priority*/}
          {/*      src="/img/icons/arrow-ios-back.svg"*/}
          {/*      height={24}*/}
          {/*      width={24}*/}
          {/*      alt="close"*/}
          {/*    />*/}
          {/*  </StyledCloseNextButton>*/}
          {/*  <StyledModalTitleNext>{"Cropping"}</StyledModalTitleNext>*/}
          {/*  <Button theme={ThemeButton.CLEAR} onClick={() => alert("handleModalBack")}>*/}
          {/*    Next*/}
          {/*  </Button>*/}
          {/*</StyledModalHeaderNext>*/}
          <PostPhotoSelectModal
            handleModalClose={() => {}}
            avatar={""}
            handleFullScreen={handleFullScreen}
            isHeaderOpen={false}
            isHeader2Open={true}
            photoPostProps={photoPost}
          />
        </>
      ) : (
        <>
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
            <Button theme={ThemeButton.CLEAR} onClick={() => alert("handleModalBack")}>
              Next
            </Button>
          </StyledModalHeaderNext>
          <StyledPhotoEditor full={full}>
            <AvatarEditor // width и height задается в styled component с учетом border
              ref={cropRef}
              image={photo}
              // border={1}
              // borderRadius={158}
              color={[23, 23, 23, 0]}
              scale={value / 10}
              // rotate={rotateAngle}
              style={{
                width: full ? "90vh" : "100%",
                height: full ? "90vh" : "100%",
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

                {/*<Image src={photoPost?photoPost:photo} alt={Photo}/>*/}
              </StyledPhotoPost>

              <div onClick={() => setOpenComp(true)}>
                <StyledIconPlusPhoto src={plusPhoto} alt={fullScreen} />
              </div>
            </StyledAddBlock>
          )}
          <div onClick={handleClickFullScreen}>
            <StyledIconFullScreen src={full ? fullScreenOn : fullScreen} alt={fullScreen} />
          </div>
          <div onClick={() => setOpenZoom(!openZoom)}>
            <StyledIconZoom src={!openZoom ? zoom : zoomOn} alt={zoom} />
          </div>
          <div
            onClick={() => {
              setOpenAddPhoto(!openAddPhoto);
              handleSave();
            }}
          >
            <StyledIconAddPhoto
              src={!openAddPhoto ? addPhoto : addPhotoOn}
              alt={addPhoto}
              full={full}
            />
          </div>
        </>
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

const StyledContainerButton = styled.div`
  margin-left: auto;
  margin-right: 24px;
`;

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
const StyleDeletePhoto = styled.button`
  position: relative;
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  right: 21px;
  bottom: 32px;
`;
