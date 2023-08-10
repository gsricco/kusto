import { ImageToolModal } from "common/hoc/ImageToolModal";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { PhotoType } from "./PostCreationModal";
import { useCreatePostMutation } from "assets/store/api/posts/postsApi";
import Canvas from "./Canvas";
import { setDefaultNamespace } from "i18next";

const PostDescriptionModal = ({
  handleBackToFilters,
  photoPost,
  handleModalClose,
  photoFile
}: {
  handleBackToFilters: (photoPost: PhotoType[]) => void;
  photoPost: PhotoType[];
  handleModalClose: () => void;
  photoFile: any;
}) => {
  const [photo, setPhoto] = useState(photoPost[0]);
  const [canvasPhoto, setCanvasPhoto] = useState<string[]>([]);
  const [createPostHandler] = useCreatePostMutation();
  const [description, setDescription] = useState("");

  const handleBack = () => {
    handleBackToFilters(photoPost);
  };

  console.log(photoFile);

  const handleCanvas = (photoUrl: string) => {
    const newList = [...canvasPhoto, photoUrl];
    setCanvasPhoto(newList);
  };

  const handlePublishButton = () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("posts", photoFile);
    console.log(photoFile);

    createPostHandler(formData);

    //   const formData = new FormData();
    //   formData.append("description", "dsgasdg dsagsda gsda g");
    //   photoPost.map((photo) => formData.append("posts", photo as File));
    //   createPostHandler(formData);
    // };
    // Сохранение значений в локальный state при перемещении бегунка
    // const handleSlider = (setState: (arg: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target) {
    //       setState(parseInt(e.target.value));
    //     }
    //   };
    // // Обработчик сохранени отредактированного изображения
    // const handleSave = async () => {
    //   // подготовка данных
    //   if (cropRef.current) {
    //     const avatar = cropRef.current.getImage().toDataURL();
    //     // преобразование base64 в file
    //     const result = await fetch(avatar);
    //     const blob = await result.blob();
    //     const file = new File([blob], "avatar", {type: "image/png"});
    //     // преобразование file в FormData
    //     const formData = new FormData();
    //     formData.append("avatar", file as File);
    //     // setPhotoPost((prev) => [...prev, file]);
    //     const newList = [...photoPost, {photoUrl: avatar, filter: ''}]
    //     setPhotoPost(newList)
    //     debugger
    //     try {
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // };
  };

  return (
    <>
      <ImageToolModal
        handleModalClose={handleModalClose}
        photoPost={photoPost}
        handleBack={handleBack}
        title="Publication"
        setPhoto={setPhoto}
        photo={photo}
        nextStep="Publish"
        handleNextStepButton={handlePublishButton}
      >
        <StyledDescriptionContainer>
          <StyledTitle>Add publication descriptions</StyledTitle>
          <StyledDescription onChange={(e) => setDescription(e.target.value)}>
            {description}
          </StyledDescription>
          <StyledDescriptionLimit>{description.length}/500</StyledDescriptionLimit>
        </StyledDescriptionContainer>
      </ImageToolModal>
      {photoPost.map((el, index) => (
        <Canvas
          key={index}
          photo={el.photoUrl}
          filter={el.filter}
          width={"0px"}
          height={"0px"}
          setImageUrl={handleCanvas}
        />
      ))}
    </>
  );
};

export default PostDescriptionModal;

const StyledDescriptionContainer = styled.div`
  height: 100%;
  padding: 10px;
  width: calc(100% - 490px);
  min-width: 180px;

  overflow: scroll;

  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  font-size: 14px;
  color: #8d9094;
`;

const StyledDescription = styled.textarea.attrs({
  maxLength: 500
})`
  width: 95%;
  background: #171717;
  border: 1px solid #4c4c4c;
  color: #8d9094;
  height: 120px;
  word-break: break-all;
  padding: 10px;
`;

const StyledDescriptionLimit = styled.p`
  color: #8d9094;
  align-self: flex-end;
  padding-right: 5%;
  font-size: 12px;
`;
