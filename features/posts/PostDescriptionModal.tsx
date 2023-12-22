/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { useState } from 'react'

import { useCreatePostImagesMutation, useCreatePostMutation } from 'assets/store/api/posts/postsApi'
import { ImageToolModal } from 'common/hoc/ImageToolModal'
import { useTranslation } from 'next-i18next'
import { styled } from 'styled-components'

import { CreatePostDescriptionRequest } from '../../assets/store/api/posts/types'

import { PhotoType } from './PostCreationModal'

///  //   Модальное окно с областью отображения отредактированных   //  ///
//          изображений и добавлением описания к ним          //

const PostDescriptionModal = ({
  handleBackToFilters,
  photoPost,
  handleModalClose,
  description,
  setDescription,
}: {
  description: string
  handleBackToFilters: (photoPost: PhotoType[]) => void
  handleModalClose: () => void
  photoPost: PhotoType[]
  setDescription: (description: string) => void
}) => {
  const [photo, setPhoto] = useState(photoPost[0]) // изображение из массива, отображаемое в модальном окне
  const [disabled, setDisabled] = useState(false)

  const [createPostHandler] = useCreatePostMutation() // сохрание поста на сервере
  const [createPostImageHandler] = useCreatePostImagesMutation() // сохрание image поста на сервере

  const { t } = useTranslation('post_cr')

  // Обработчик нажатия кнопки Back
  const handleBack = () => {
    handleBackToFilters(photoPost)
  }

  // Обработчик нажатия кнопки Publish
  const handlePublishButton = async () => {
    const formData = new FormData()

    // преобразование url всех изображений в file
    for (const photoPostEl of photoPost) {
      const result = await fetch(photoPostEl.photoUrlWithFilter)
      const blob = await result.blob()
      const file = new File([blob], 'file', { type: 'image/jpeg' })

      // добавление file в FormData
      formData.append('file', file as File)
    }
    // добавление описания в FormData
    // formData.append('description', description)

    let dataPost: CreatePostDescriptionRequest

    setDisabled(true)
    createPostImageHandler(formData)
      .then(res => {
        if ('data' in res) {
          const uploads = res.data.images.map(img => img.uploadId).filter((up, index) => index % 2)

          dataPost = {
            description,
            childrenMetadata: uploads.map(up => ({ uploadId: up })),
          }
        }
      })
      .then(() => {
        createPostHandler(dataPost)
          .unwrap()
          .then(() => handleModalClose())
          .catch(error => console.log(error))
      })
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
  width: 100%;
  background: #171717;
  border: 1px solid #4c4c4c;
  color: #8d9094;
  height: 120px;
  word-break: break-all;
  padding: 10px;
  resize: none;
`

const StyledDescriptionLimit = styled.p`
  color: #8d9094;
  align-self: flex-end;
  padding-right: 5%;
  font-size: 12px;
`
