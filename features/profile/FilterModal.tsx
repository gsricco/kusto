
import Image from "next/image";
import styled from "styled-components";
import {baseTheme} from "styles/styledComponents/theme";
import closeIcon from "/public/img/icons/close_white.svg"  
import FilterElement from "./FilterElement";
import { useState } from "react";
import Canvas from "./Canvas";

const FilterModal = ({
    handleModalClose, 
    photo
  }: {
    handleModalClose: () => void
    photo: File | string | undefined
  }) => {

    const [newFilter, setNewFilter] = useState('')

    let photoUrl = ''
    if (photo && typeof photo !== 'string') {
        photoUrl = URL.createObjectURL(photo)
    } else if (typeof photo == 'string') {
        photoUrl = photo
    }

    const filtersList = [
        {
            filterTitle: 'Normal',
            filter: ''
        },
        {
            filterTitle: 'blur(2px)',
            filter: 'blur(2px)'
        },
        {
            filterTitle: 'blur(1px)',
            filter: 'blur(1px)'
        }
    ]

    const handleFilter = (filterTitle: string) => {
        setNewFilter(filterTitle)
    }

    console.log(newFilter)

return (
    <StyledModalOverlay>
      <StyledModalContainer>
        <StyledModalHeader>
          <StyledModalTitle>Filters</StyledModalTitle>
          <StyledCloseButton onClick={handleModalClose}>
            <Image
              priority
              src={closeIcon}
              height={24}
              width={24}
              alt="close"
            />
          </StyledCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
            <Canvas photo={photoUrl}
              height={'503px'}
              width={'490px'}
              filter={newFilter}/>
            {/* <Image
              src={photoUrl}
              height={503}
              width={490}
              alt="nolmal"
              style={{objectFit: 'contain', filter: {newFilter}}}
            /> */}
            <FiltersContainer>
                {filtersList.map( el => <FilterElement filter={el.filter} filterTitle={el.filterTitle} photoUrl={photoUrl} handleFilter={handleFilter}/>)}
            </FiltersContainer>

        {/* { isEditorOpen && photo ? <PhotoEditorModal photo={photo} handleEditorClose={handleEditorClose}/> 
            : <>
            <StyledModalImageContainer>
              { avatar ? <img id="avatar" src={avatar} alt="Avatar"/> 
                : <StyledModalImage
                  priority
                  src={'/img/icons/image-outline.svg'}
                  height={48}
                  width={48}
                  alt="avatar"
                />
              }
              </StyledModalImageContainer>
                <input id="file-upload" type="file" accept="image/*" onChange={handleSelectPhoto}/>
                <Button theme={ThemeButton.PRIMARY} width='222px' id="upload-btn">
                  <label htmlFor="file-upload">Select from Computer</label>
                </Button>
            </>
        } */}
        </StyledModalBody>
      </StyledModalContainer>
    </StyledModalOverlay>
  );
}

export default FilterModal

// styles

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
  border: 1px solid ${baseTheme.colors.dark["100"]};
  background: ${baseTheme.colors.dark["300"]};
  top: 50%;
  left: 50%;
  width: 972px;
  height: 564px;
  transform: translate(-50%, -50%);

  @media (max-width: 500px) {
    width: 90vw;
    max-width: 492px;
  }
`;

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
  flex-direction: row;

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
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:222px;
    height:228px;
    object-fit:cover;
    border-radius: 50%;
  }

  @media (max-width: 390px) {
      width: 80vw;
      max-width: 222px;
    }
`;

const StyledModalImage = styled(Image) `

    color: ${baseTheme.colors.light["100"]};

    margin: auto;
    border-radius: 2px;
    width: ${props=>props.width};
    height: ${props=>props.height};
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-around;

  width: 100%;
  margin: auto;
`;
