import Image from 'next/image';
import styled from 'styled-components';
import {ReactNode} from 'react';

type ModalType = {
  onClose: () => void;
  title: string;
  children: ReactNode
}

export const Modal = ({
                        onClose,
                        title,
                        children
                      }: ModalType
) => {

  const onContentClick = (e: any) => {
    e.stopPropagation()
  }

  return (
    <StyledModalOverlay onClick={onClose}>
      <StyledModalContainer onClick={onContentClick}>
        <StyledModalHeader>
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledCloseButton onClick={onClose}>
            <Image
              priority
              src="img/icons/close_white.svg"
              height={24}
              width={24}
              alt="close"
            />
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
          {children}
        </StyledModalBody>
      </StyledModalContainer>
    </StyledModalOverlay>
  );
};

const StyledModalOverlay = styled.div`
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledModalContainer = styled.div`
  position: fixed;

  border-radius: 2px;
  border: 1px solid #4c4c4c;
  background: #333333;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModalHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  border-bottom: 1px solid #4c4c4c;
`;

const StyledModalTitle = styled.span`
  flex: 1;
  color: #fff;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
`;

const StyledCloseButton = styled.button`
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;

  &:hover {
    fill: #397df6;
  }
`;

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  color: #fff;
  padding: 30px 24px;
`;
