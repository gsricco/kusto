import styled from "styled-components";
import Canvas from "./Canvas";
import { useState } from "react";

const FilterElement = ({ 
    key,
    photoUrl,
    filterTitle,
    filter,
    handleFilter
  }: {
    key?: string
    photoUrl: string
    filterTitle: string
    filter: string
    handleFilter: (filterTitle: string, imageUrl: string) => void
  }) => {

    const [ImageUrl, setImageUrl] = useState('')

    const handleFilterChose = () => {
      handleFilter(filter, ImageUrl)
    }

    return (
      <StyledModalBody onClick={handleFilterChose}>
        <Canvas photo={photoUrl} filter={filter} width={'108px'} height={'108px'} setImageUrl={setImageUrl}/>
        <StyledFilterTitle>
          {filterTitle}
        </StyledFilterTitle>
      </StyledModalBody>  
    )
}

export default FilterElement

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  margin: auto;
`;

const StyledFilterTitle = styled.div`

  width: 100%;
  max-width: 160px;
  text-align: center;
`;
