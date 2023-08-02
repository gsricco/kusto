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
    const [createPostHandler] = useCreatePostMutation();

    const handleBack = () => {
        handleBackToFilters(photoPost)
    }

    const handlePublishButton = () => {
        console.log(photoPost)

        const formData = new FormData();
        formData.append("description", "dsgasdg dsagsda gsda g");
        photoPost.map(async(photo) => {
            //преобразование base64 в file
            const result = await fetch(photo.photoUrlWithFilter);
            const blob = await result.blob();
            const file = new File([blob], "avatar", {type: "image/png"});

            // преобразование file в FormData
            formData.append("posts", file as File);
        })

        createPostHandler(formData);
    };

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