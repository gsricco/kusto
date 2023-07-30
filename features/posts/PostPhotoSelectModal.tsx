import Image from "next/image";
import React, {useState} from "react";
import styled from "styled-components";
import {baseTheme} from "styles/styledComponents/theme";
import PostPhotoEditorModal from "./PostPhotoEditorModal";
import {Button} from "common/components/Button/Button";
import {ThemeButton} from "common/enums/themeButton";

const PostPhotoSelectModal = ({
                                handleModalClose,
                                handleFullScreen,
                                avatar,
                                isHeaderOpen,
                                isHeader2Open,
                                photoPostProps
                              }: {
  handleModalClose: () => void;
  avatar?: string;
  handleFullScreen: (full: boolean) => void;
  isHeaderOpen?: boolean
  isHeader2Open?: boolean
  photoPostProps?: string[]
}) => {
  const [photo, setPhoto] = useState<File>(); // изображение, передаваемое в компоненту редактирования
  const [isEditorOpen, setIsEditorOpen] = useState(isHeaderOpen); // открытие модального окна для редактирования
  const [isFilterOpen, setIsFilterOpen] = useState(false) // открытие модального окна для наложения фильтров
  const [photoList, setPhotoList] = useState([''])

  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      console.log(["file", file]);
      setPhoto(file);
      // changeHeader(false);
      setIsEditorOpen(true);
    }
  };

  const handleEditorClose = () => {
    setIsEditorOpen(false);
    handleModalClose();
  };

  const handleClickFullScreen = (full: boolean) => {
    handleFullScreen(full);
  };

  const handleFilterOpen = (editPhotoList: string[]) => {
    setIsFilterOpen(true)
    setPhotoList(editPhotoList)
  }

  return (
    <>
      <StyledModalBody>
        {isEditorOpen && photo
          ? <PostPhotoEditorModal
            photo={photo}
            handleEditorClose={handleEditorClose}
            handleFullScreen={(full) => handleClickFullScreen(full)}
            photoPost1={photoPostProps || []}
            handleFilterOpen={handleFilterOpen}
          />
          : (
            <>
              <StyledModalHeader>
                <StyledModalTitle>{"Add Photo"}</StyledModalTitle>
                <StyledCloseButton onClick={handleModalClose}>
                  <Image priority src="/img/icons/close_white.svg" height={24} width={24} alt="close"/>
                </StyledCloseButton>
              </StyledModalHeader>
              <StyledModalImageContainer>
                {avatar
                  ? <Image id="avatar" src={avatar} alt="Avatar"/>
                  : <StyledModalImage
                    priority
                    src={"/img/icons/image-outline.svg"}
                    height={48}
                    width={48}
                    alt="avatar"
                  />
                }
              </StyledModalImageContainer>
              <input id="file-upload" type="file" accept="image/*" onChange={handleSelectPhoto}/>
              <Button theme={ThemeButton.PRIMARY} width="222px" id="upload-btn">
                <label htmlFor="file-upload">Select from Computer</label>
              </Button>
            </>
          )}
      </StyledModalBody>
    </>
  );
};

export default PostPhotoSelectModal;

// styles

// const StyledModalOverlay = styled.div`
//   z-index: 1000;
//   background-color: rgba(0, 0, 0, 0.4);
//   position: fixed;
//   top: 61px;
//   left: 0;
//   width: 100%;
//   height: 89%;
//   overflow: hidden;
// `;
//
// const StyledModalContainer = styled.div`
//   position: fixed;
//
//   border-radius: 2px;
//   border: 1px solid ${baseTheme.colors.dark["100"]};
//   background: ${baseTheme.colors.dark["300"]};
//   top: 50%;
//   left: 50%;
//   width: 492px;
//   height: 564px;
//   transform: translate(-50%, -50%);
//
//   @media (max-width: 500px) {
//     width: 90vw;
//     max-width: 492px;
//   }
// `;

const StyledModalHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  border-bottom: 1px solid ${baseTheme.colors.dark["100"]};
`;

const StyledModalTitle = styled.span`
  flex: 1;
  color: ${baseTheme.colors.light["100"]};
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
`;

const StyledCloseButton = styled.button`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;

  &:hover {
    cursor: pointer;
  }
`;

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

  & label {
    cursor: pointer;
  }
`;

const StyledModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  background: ${baseTheme.colors.dark["500"]};
  color: ${baseTheme.colors.light["100"]};
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
`;

const StyledModalImage = styled(Image)`
  color: ${baseTheme.colors.light["100"]};

  margin: auto;
  border-radius: 2px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
