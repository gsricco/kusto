import { useState } from 'react'

import { Button } from 'common/components/Button/Button'
import { ThemeButton } from 'common/enums/themeButton'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import closeIcon from 'public/img/icons/close_white.svg'
import styled from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

import PhotoEditorModal from './PhotoEditorModal'

/// /  //  Модальное окно загрузки новой аватарки  //  ////

const PhotoSelectModal = ({
  handleModalClose,
  avatar,
  setAvatar,
}: {
  avatar?: string
  handleModalClose: () => void
  setAvatar: (newAvater: string) => void
}) => {
  const [photo, setPhoto] = useState<File>() // изображение, передаваемое в компоненту редактирования
  const [isEditorOpen, setIsEditorOpen] = useState(false) // открытие модального окна для редактирования
  const { t } = useTranslation() // переводчик

  // const image = avatar || "/img/icons/image-outline.svg"

  // обработчик выбора новой аватарки из файловой системы компьютера
  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0]

      setPhoto(file)
      setIsEditorOpen(true)
    }
  }

  // закрытие модальных окон для загрузки и обработки новой аватарки
  const handleEditorClose = () => {
    setIsEditorOpen(false)
    handleModalClose()
  }

  return (
    <StyledModalOverlay>
      <StyledModalContainer>
        <StyledModalHeader>
          <StyledModalTitle>{t('add_prof_photo')}</StyledModalTitle>
          <StyledCloseButton onClick={handleModalClose}>
            <Image alt="close" height={24} src={closeIcon} width={24} priority />
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
          {isEditorOpen && photo ? (
            <PhotoEditorModal
              handleEditorClose={handleEditorClose}
              photo={photo}
              setAvatar={setAvatar}
            />
          ) : (
            <>
              <StyledModalImageContainer>
                {/* {avatar ? (
                  <img alt="Avatar" id="avatar" src={avatar} />
                ) : ( */}
                <StyledModalImage
                  alt="avatar"
                  height={48}
                  src="/img/icons/image-outline.svg"
                  width={48}
                  priority
                />
                {/* )} */}
              </StyledModalImageContainer>
              <input accept="image/*" id="file-upload" type="file" onChange={handleSelectPhoto} />
              <Button id="upload-btn" theme={ThemeButton.PRIMARY} width="222px">
                <StyledLabel htmlFor="file-upload">
                  <StyledText>{t('select_from_comp')}</StyledText>
                </StyledLabel>
              </Button>
            </>
          )}
        </StyledModalBody>
      </StyledModalContainer>
    </StyledModalOverlay>
  )
}

export default PhotoSelectModal

// styles

const StyledModalOverlay = styled.div`
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const StyledModalContainer = styled.div`
  position: fixed;

  border-radius: 2px;
  border: 1px solid ${baseTheme.colors.dark['100']};
  background: ${baseTheme.colors.dark['300']};
  top: 50%;
  left: 50%;
  width: 492px;
  height: 564px;
  transform: translate(-50%, -50%);

  @media (max-width: 500px) {
    width: 90vw;
    max-width: 492px;
  }
`

const StyledModalHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  border-bottom: 1px solid ${baseTheme.colors.dark['100']};
`

const StyledModalTitle = styled.span`
  flex: 1;
  color: ${baseTheme.colors.light['100']};
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
`

const StyledCloseButton = styled.button`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin: auto;

  & #file-upload {
    display: none;
  }

  & #upload-btn {
    margin: 20px auto;

    @media (max-width: 390px) {
      width: 80vw;
      max-width: 222px;
    }
  }
`

const StyledLabel = styled.label`
  display: inline-block;
  width: 100%;
  height: 100%;
  padding-top: 8px; // не подучается центрировать по вертикали
`

const StyledText = styled.div`
  // margin: auto;
  // vertical-align: middle;
  // justify-content: center;
  // align-items: center;
`

const StyledModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  background: ${baseTheme.colors.dark['500']};
  color: ${baseTheme.colors.light['100']};
  margin: 72px auto 40px;
  border-radius: 2px;
  width: 222px;
  height: 228px;

  & #avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 222px;
    height: 228px;
    object-fit: cover;
    border-radius: 50%;
  }

  @media (max-width: 390px) {
    width: 80vw;
    max-width: 222px;
  }
`

const StyledModalImage = styled(Image)`
  color: ${baseTheme.colors.light['100']};

  margin: auto;
  border-radius: 2px;
  width: ${props => props.width};
  height: ${props => props.height};
`
