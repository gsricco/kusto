import FilterElement from "./FilterElement";
import { useState } from "react";
import { filtersList } from "common/utils/filters";
import { ImageToolModal } from "common/hoc/ImageToolModal";
import { styled } from "styled-components";
import { PhotoType } from "./PostCreationModal";

const FilterModal = ({
    handleModalClose, 
    photoPost,
    handleBackToEditor,
    handleNextToPublishButton,
  }: {
    handleModalClose?: () => void
    photoPost: string[]
    handleBackToEditor: (filterPhotoList: string[]) => void
    handleNextToPublishButton: (filterPhotoList: string[]) => void
  }) => {

    const [photo, setPhoto] = useState(photoPost[0])
    const [filterPhotoList, setFilterPhotoList] = useState<string[]>(photoPost)

  const handleFilter = (filter: string, newPhoto: string) => {
      const filterPhotoPost = photoPost.map((el) => {
        if(el == photo) {
          el = filter
        }
        return el
      })
      setFilterPhotoList(filterPhotoPost)
  }

  const handleBack = () => {
    handleBackToEditor(filterPhotoList)
    console.log('photo in filter at back', filterPhotoList)
  }

  const handleNextButton = () => {
    handleNextToPublishButton(filterPhotoList)
  }

  return (
    <ImageToolModal 
      handleModalClose={handleModalClose} 
      photoPost={photoPost} 
      handleBack={handleBack}
      title='Filters'
      setPhoto={setPhoto}
      photo={photo}
      nextStep='Next'
      handleNextStepButton={handleNextButton}
      >
        <StyledFiltersContainer key={photo}>
          {filtersList.map( (el, index) => 
            <FilterElement 
              key={index} 
              filter={el.filter} 
              filterTitle={el.filterTitle} 
              photoUrl={photo}
              handleFilter={handleFilter}
            />
          )}
        </StyledFiltersContainer>
      
    </ImageToolModal>
  )
}

export default FilterModal

const StyledFiltersContainer = styled.div<{key: string}>`
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 3;

    height: 100%;
    padding: 10px;
    width: calc(100% - 490px);
    min-width: 180px;

    overflow: scroll;
`;
