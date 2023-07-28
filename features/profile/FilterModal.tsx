
import Image from "next/image";
import styled from "styled-components";
import {baseTheme} from "styles/styledComponents/theme";
import closeIcon from "/public/img/icons/close_white.svg"  
import FilterElement from "./FilterElement";
import { useState } from "react";
import { filtersList } from "common/utils/filters";

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

    const handleFilter = (filterTitle: string) => {
        setNewFilter(filterTitle)
    }

return (
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
            <StyledImageContainer>
                <Image
                    src={photoUrl}
                    width={0}
                    height={0}
                    alt="nolmal"
                    style={{width: '100%', height: '100%', objectFit: 'contain', filter: newFilter}}
                />
            </StyledImageContainer> 
                
            <StyledFiltersContainer>
                {filtersList.map( el => 
                <FilterElement 
                    key={el.filterTitle} 
                    filter={el.filter} 
                    filterTitle={el.filterTitle} 
                    photoUrl={photoUrl} 
                    handleFilter={handleFilter}
                />)}
            </StyledFiltersContainer>
        </StyledModalBody>
      </StyledModalContainer>
    
  );
}

export default FilterModal

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
  height: 503px;
  

//   & #file-upload {
//     display: none;
//   }

//   & #upload-btn {
//     margin: 20px auto;

//     @media (max-width: 390px) {
//       width: 80vw;
//       max-width: 222px;
//     }
//   } 

//   & label {
//     cursor: pointer;
//   }

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
