import styled from 'styled-components'

import { ModalSizePropsType } from './types'

export const StyledModalOverlay = styled.div<{ bg?: string }>`
  z-index: 1000;
  background-color: ${props => (props.bg ? 'none' : 'rgba(0, 0, 0, 0.4)')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const StyledModalContainer = styled.div<ModalSizePropsType>`
  position: fixed;
  width: ${props => (props.width ? props.width : '380px')};
  height: ${props => (props.height ? props.height : '230px')};

  border-radius: 2px;
  border: 1px solid #4c4c4c;
  background: #333333;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const StyledModalHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  border-bottom: 1px solid #4c4c4c;
`
export const StyledModalHeaderNext = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid #4c4c4c;
`

export const StyledModalTitle = styled.span`
  flex: 1;
  color: #fff;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
`
export const StyledModalTitleNext = styled.span`
  color: #fff;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
`

export const StyledCloseButton = styled.button`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;

  &:hover {
    fill: #397df6;
  }
`
export const StyledCloseNextButton = styled.button`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;

  &:hover {
    fill: #397df6;
  }
`

export const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  color: #fff;
  padding: 30px 24px;
`

export const StyledBlockButton = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
  gap: 20px;
`
export const Bold = styled.span`
  font-weight: 700;
`
export const ModalContent = styled.p`
  font-size: 16px;
`
