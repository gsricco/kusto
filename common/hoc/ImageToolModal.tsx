import Image from "next/image";
import styled from "styled-components";
import {baseTheme} from "styles/styledComponents/theme";
import { FC, PropsWithChildren, useState } from "react";
import { StyledCloseNextButton, StyledModalHeaderNext, StyledModalTitleNext } from "common/components/Modals/Modal.styled";
import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";

type Props = {
    handleModalClose?: () => void
    photoPost: string []
    handleBack: (photoPost: string []) => void
    newFilter?: string
    title: string
    setPhotoUrl: (photoUrl: string) => void
    photoUrl: string
    nextStep: string
    handleNextStepButton: () => void
}
export const ImageToolModal: FC<PropsWithChildren<Props>> = ({
    children, handleModalClose, 
    photoPost, handleBack, 
    newFilter, title, 
    photoUrl, setPhotoUrl, nextStep, handleNextStepButton, ...otherProps }) => {

    const [photoIndex, setPhotoIndex] = useState(0)

    const handleNextPhoto = () => {
        const newIndex = photoIndex + 1
        if(newIndex <= photoPost.length - 1) {
            setPhotoIndex(newIndex)
            setPhotoUrl(photoPost[newIndex])
        }
    }

    const handlePrevPhoto = () => {
        const newIndex = photoIndex - 1
        if(newIndex >= 0) {
            setPhotoIndex(newIndex)
            setPhotoUrl(photoPost[newIndex])
        }
        
    }
    console.log("list", photoPost)

  const handleBackButton = () => {
    handleBack(photoPost)
  }

return (
      <StyledModalContainer>
        <StyledModalHeaderNext>
            <StyledCloseNextButton onClick={handleBackButton}>
              <Image
                priority
                src="/img/icons/arrow-ios-back.svg"
                height={24}
                width={24}
                alt="back"
              />
            </StyledCloseNextButton>
            <StyledModalTitleNext>{title}</StyledModalTitleNext>
            <Button theme={ThemeButton.CLEAR} onClick={handleNextStepButton}>
              {nextStep}
            </Button>
        </StyledModalHeaderNext>
        <StyledModalBody>
            <div onClick={handlePrevPhoto}> Prev </div>
            <StyledImageContainer>
              <Image
                  src={photoUrl}
                  width={0}
                  height={0}
                  alt="nolmal"
                  style={{width: '100%', height: '100%', objectFit: 'contain', filter: newFilter}}
              />
            </StyledImageContainer> 
            <div onClick={handleNextPhoto}> Next </div>

            <StyledFiltersContainer key={photoUrl}>
                {children}
            </StyledFiltersContainer>
        </StyledModalBody>
      </StyledModalContainer>
  );
}

// styles

const StyledModalContainer = styled.div`
  position: fixed;

  border-radius: 2px;
  border: 1px solid ${baseTheme.colors.dark["100"]};
  background: ${baseTheme.colors.dark["300"]};
  top: 50%;
  left: 50%;
  width: 972px;
  height: 564px;
  transform: translate(-50%, -50%);

  @media (max-width:1000px) {
    width: 90vw;
    max-width: 972px;
  }

`;

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 503px;
`;

const StyledImageContainer = styled.div`
    flex-shrink: 2;

    min-width: 300px;
    width: 490px;
    height: 100%;
`;

const StyledFiltersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 3;

    height: 100%;
    padding: 10px;
    width: calc(100% - 490px);
    min-width: 180px;

    overflow: scroll;
`;