import { ImageToolModal } from "common/hoc/ImageToolModal"
import { useState } from "react"

const PostDescriptionModal = ({
        handleBackToFilters, 
        photoPost,
        handleModalClose,
    }: {
        handleBackToFilters: (photoPost: string[]) => void 
        photoPost: string[]
        handleModalClose: () => void
}) => {

    const [photoUrl, setPhotoUrl] = useState(photoPost[0])

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
            setPhotoUrl={setPhotoUrl}
            photoUrl={photoUrl}
            nextStep='Publish'
            handleNextStepButton={handlePublishButton}
            >
            <div>Description</div>
        </ImageToolModal>
    )
}

export default PostDescriptionModal
