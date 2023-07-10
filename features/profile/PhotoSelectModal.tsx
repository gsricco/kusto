
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import PhotoEditorModal from "./PhotoEditorModal";

const PhotoSelectModal = ({handleModalClose, handleImage}: {
  handleModalClose: () => void
  handleImage: (image: string) => void
}) => {

  const [photo, setPhoto] = useState<File>()
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
          const file = e.target.files[0]
          setPhoto(file)
          setIsEditorOpen(true)
      }
  }

  const handleEditorClose = (image: string) => {
    handleImage(image)
    setIsEditorOpen(false)
    handleModalClose()
    
}


return (
    <StyledModalOverlay>
      <StyledModalContainer>
        <StyledModalHeader>
          <StyledModalTitle>Add a Profile Photo</StyledModalTitle>
          <StyledCloseButton onClick={handleModalClose}>
            <Image
              priority
              src="img/icons/close_white.svg"
              height={24}
              width={24}
              alt="close"
            />
          </StyledCloseButton>
        </StyledModalHeader>
        
        { isEditorOpen && photo ? <PhotoEditorModal photo={photo} handleEditorClose={handleEditorClose}/> 
            : <StyledModalBody>
                <input id="file-upload" type="file" onChange={handleSelectPhoto}/>
                <StyledConfirmButton>
                    <label htmlFor="file-upload">Select from Computer</label>
                </StyledConfirmButton>
            </StyledModalBody>
        }
       
        

      </StyledModalContainer>
    </StyledModalOverlay>
  );
}

export default PhotoSelectModal

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

const StyledConfirmButton = styled.button`
  margin-top: 18px;
  width: 96px;
  padding: 6px 24px;
  border-radius: 2px;
  background: #397df6;
  color: #fff;
  border: 0;
  align-self: flex-end;
`;
