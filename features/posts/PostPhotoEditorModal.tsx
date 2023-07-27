import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Slider } from "./Slider";
import styled from "styled-components";
import fullScreen from "../../public/img/icons/expand-outline.svg";
import fullScreenOn from "../../public/img/icons/expand.svg";
import zoom from "../../public/img/icons/maximize-outline.svg";
import zoomOn from "../../public/img/icons/maximize.svg";
import addPhoto from "../../public/img/icons/image-outline.svg";
import Image from "next/image";
import { baseTheme } from "../../styles/styledComponents/theme";
import { useCreatePostMutation } from "assets/store/api/posts/postsApi";

const PostPhotoEditorModal = ({
  photo,
  handleEditorClose,
  handleFullScreen
}: {
  photo: File;
  handleEditorClose: () => void;
  handleFullScreen: (full: boolean) => void;
}) => {
  const [value, setValue] = useState(12); // начальное значение для zoom
  const [openZoom, setOpenZoom] = useState(false); // начальное значение для rotate
  const [full, setFullScreen] = useState(false);
  const [photoPost, setPhotoPost] = useState<File[]>([]);

  const [createPostHandler] = useCreatePostMutation();

  console.log(photoPost);

  const cropRef = useRef<AvatarEditor | null>(null);

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

  const handleClickFullScreen = () => {
    handleFullScreen(!full);
    setFullScreen(!full);
  };

  const create = () => {
    const data = {
      description: "bla bla bla bla bla",
      images: photoPost
    };
    console.log("works");
    createPostHandler(data);
  };

  return (
    <>
      {/* <button onClick={() => create()}>send photo</button> */}
      <StyledPhotoEditor full={full}>
        {photoPost.length ? (
          <>
            <input id="file-upload" type="file" accept="image/*" />
            <label htmlFor="file-upload">Select from Computer</label>
          </>
        ) : null}
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
              width: "80%",
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
      <StyledPhotoPost>
        {photoPost.map((photo) => (
          <AvatarEditor // width и height задается в styled component с учетом border
            // ref={cropRef}
            key={Math.random()}
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
          />
        ))}
        {/*<Image src={photoPost?photoPost:photo} alt={Photo}/>*/}
      </StyledPhotoPost>
      <div onClick={() => create()}>
        <StyledIconFullScreen src={full ? fullScreenOn : fullScreen} alt={fullScreen} />
      </div>
      <div onClick={() => setOpenZoom(!openZoom)}>
        <StyledIconZoom src={!openZoom ? zoom : zoomOn} alt={zoom} />
      </div>
      <div
        onClick={() => {
          handleSave();
        }}
      >
        <StyledIconAddPhoto src={addPhoto} alt={addPhoto} full={full} />
      </div>
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
  bottom: 60px;
  right: 20px;
  background: ${baseTheme.colors.dark["300"]};
  opacity: 0.7;
  display: flex;
  overflow-x: scroll;
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
