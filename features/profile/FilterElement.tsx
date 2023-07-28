import styled from "styled-components";
import Canvas from "./Canvas";

const FilterElement = ({ 
    photoUrl,
    filterTitle,
    filter,
    handleFilter
  }: {
    photoUrl: string
    filterTitle: string
    filter: string
    handleFilter: (filterTitle: string) => void
  }) => {

    const handleFilterChose = () => {
      handleFilter(filter)
    }

    return (<Body onClick={handleFilterChose}>
      <Canvas photo={photoUrl} filter={filter} width={'108px'} height={'108px'}/>
      <FilterTitle>
        {filterTitle}
      </FilterTitle>
    </Body>  
    )
}

export default FilterElement

const Body = styled.div`
  display: flex;
  flex-direction: column;

`;

const ImageContainer = styled.div`
  width: 108px;
  height: 108px;
`;

const FilterTitle = styled.div`

  width: 100%;
  margin: auto;
`;