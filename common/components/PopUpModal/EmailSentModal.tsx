import Image from "next/image"
import styled from "styled-components"

export const EmailSentModal = ({
  handleModalClose,
  handleCrossClick,
  handleConfirmClick,
  title,
  bodyText,
  buttonText = "OK"
}: {
  handleModalClose: () => void
  handleCrossClick?: () => void
  handleConfirmClick?: () => void
  title: string
  bodyText: string
  buttonText?: string
}) => {
  const onCloseButtonClick = () => {
    handleModalClose()
    if (handleCrossClick) {
      handleCrossClick()
    }
  }
  const onConfirmButtonClick = () => {
    handleModalClose()
    if (handleConfirmClick) {
      handleConfirmClick()
    }
  }

  return (
    <StyledModalOverlay>
      <StyledModalContainer>
        <StyledModalHeader>
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledCloseButton onClick={onCloseButtonClick}>
            <Image priority src="/close.svg" height={24} width={24} alt="close" />
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
          <p>{bodyText}</p>
          <StyledConfirmButton onClick={onConfirmButtonClick}>{buttonText}</StyledConfirmButton>
        </StyledModalBody>
      </StyledModalContainer>
    </StyledModalOverlay>
  )
}

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
  border: 1px solid #4c4c4c;
  background: #333333;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledModalHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  border-bottom: 1px solid #4c4c4c;
`

const StyledModalTitle = styled.span`
  flex: 1;
  color: #fff;
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
    fill: #397df6;
  }
`

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  color: #fff;
  padding: 30px 24px;
`

const StyledConfirmButton = styled.button`
  margin-top: 18px;
  width: 96px;
  padding: 6px 24px;
  border-radius: 2px;
  background: #397df6;
  color: #fff;
  border: 0;
  align-self: flex-end;
`