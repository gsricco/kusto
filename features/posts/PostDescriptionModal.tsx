import { useState } from 'react'

import { useCreatePostMutation } from 'assets/store/api/posts/postsApi'
import { ImageToolModal } from 'common/hoc/ImageToolModal'
import { useTranslation } from 'next-i18next'
import { styled } from 'styled-components'

import { PhotoType } from './PostCreationModal'

///  //   Модальное окно с областью отображения отредактированных   //  ///
//          изображений и добавлением описания к ним          //

const PostDescriptionModal = ({
  handleBackToFilters,
  photoPost,
  handleModalClose,
}: {
  handleBackToFilters: (photoPost: PhotoType[]) => void
  handleModalClose: () => void
  photoPost: PhotoType[]
}) => {
  const [photo, setPhoto] = useState(photoPost[0]) // изображение из массива, отображаемое в модальном окне
  const [description, setDescription] = useState('') // описание, добавляемое к изображениям
  const [disabled, setDisabled] = useState(false)

  const [createPostHandler] = useCreatePostMutation() // сохрание поста на сервере

  const { t } = useTranslation('post_cr')

  // Обработчик нажатия кнопки Back
  const handleBack = () => {
    handleBackToFilters(photoPost)
  }

  // Обработчик нажатия кнопки Publish
  const handlePublishButton = async () => {
    const formData = new FormData()

    // преобразование url всех изображений в file
    for (const photo of photoPost) {
      const result = await fetch(photo.photoUrlWithFilter)
      const blob = await result.blob()
      const file = new File([blob], 'avatar', { type: 'image/jpeg' })
      // console.log("FILE", photo.photoUrlWithFilter)

      // добавление file в FormData
      formData.append('posts', file as File)
    }
    // добавление описания в FormData
    formData.append('description', description)

    setDisabled(true)
    createPostHandler(formData)
      .unwrap()
      .then(() => handleModalClose())
      .catch(error => console.log(error))
  }

  return (
    <ImageToolModal
      disabled={disabled}
      handleBack={handleBack}
      handleModalClose={handleModalClose}
      handleNextStepButton={handlePublishButton}
      nextStep={t('publish')}
      photo={photo}
      photoPost={photoPost}
      setPhoto={setPhoto}
      title={t('publication')}
    >
      <StyledDescriptionContainer>
        <StyledTitle>{t('add_descr')}</StyledTitle>
        <StyledDescription onChange={e => setDescription(e.target.value)}>
          {description}
        </StyledDescription>
        <StyledDescriptionLimit>{description.length}/500</StyledDescriptionLimit>
      </StyledDescriptionContainer>
    </ImageToolModal>
  )
}

export default PostDescriptionModal

// Стили
const StyledDescriptionContainer = styled.div`
  height: 100%;
  padding: 10px;
  width: calc(100% - 490px);
  min-width: 180px;

  overflow: scroll;

  display: flex;
  flex-direction: column;
`

const StyledTitle = styled.p`
  font-size: 14px;
  color: #8d9094;
`

const StyledDescription = styled.textarea.attrs({
  maxLength: 500,
})`
  width: 95%;
  background: #171717;
  border: 1px solid #4c4c4c;
  color: #8d9094;
  height: 120px;
  word-break: break-all;
  padding: 10px;
`

const StyledDescriptionLimit = styled.p`
  color: #8d9094;
  align-self: flex-end;
  padding-right: 5%;
  font-size: 12px;
`
