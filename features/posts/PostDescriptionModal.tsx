import { ImageToolModal } from "common/hoc/ImageToolModal"
import { useState } from "react"
import { styled } from "styled-components"
import { PhotoType } from "./PostCreationModal"
import { useCreatePostMutation } from "assets/store/api/posts/postsApi"
import Canvas from "./Canvas"

const PostDescriptionModal = ({
        handleBackToFilters, 
        photoPost,
        handleModalClose,
    }: {
        handleBackToFilters: (photoPost: PhotoType[]) => void 
        photoPost: PhotoType[]
        handleModalClose: () => void
}) => {

    const [photo, setPhoto] = useState(photoPost[0])
    const [canvasPhoto, setCanvasPhoto] = useState<string []>([])
    const [createPostHandler] = useCreatePostMutation();

   

    const handleBack = () => {
        handleBackToFilters(photoPost)
    }

    const handleCanvas = (photoUrl: string) => {
        const newList = [...canvasPhoto, photoUrl]
        setCanvasPhoto(newList)
    }

    const handlePublishButton = () => {
        console.log(canvasPhoto)

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
    }

    return (<>
        <ImageToolModal 
            handleModalClose={handleModalClose} 
            photoPost={photoPost} 
            handleBack={handleBack}
            title='Publication'
            setPhoto={setPhoto}
            photo={photo}
            nextStep='Publish'
            handleNextStepButton={handlePublishButton}
            >
                <StyledDescriptionContainer>
                                <div>Description</div>
                </StyledDescriptionContainer>
        </ImageToolModal>
        {photoPost.map( (el, index) => 
            <Canvas 
                key={index} 
                photo={el.photoUrl}
                filter={el.filter} 
                width={"0px"}
                height={"0px"} 
                setImageUrl={handleCanvas}
            />
          )}
          </>
    )
}

export default PostDescriptionModal

const StyledDescriptionContainer = styled.div`

    height: 100%;
    padding: 10px;
    width: calc(100% - 490px);
    min-width: 180px;

    overflow: scroll;
`;
