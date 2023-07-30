import { ImageToolModal } from "common/hoc/ImageToolModal"
import { useState } from "react"
import { styled } from "styled-components"
import { PhotoType } from "./PostPhotoEditorModal"

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

    console.log(photoPost)

    const handleBack = () => {
        handleBackToFilters(photoPost)
    }

    const handlePublishButton = () => {
        alert('send request')
    }

    return (
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
