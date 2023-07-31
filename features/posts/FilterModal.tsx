import FilterElement from "./FilterElement";
import { useState } from "react";
import { filtersList } from "common/utils/filters";
import { ImageToolModal } from "common/hoc/ImageToolModal";
import { styled } from "styled-components";
import { PhotoType } from "./PostPhotoEditorModal";

const FilterModal = ({
    handleModalClose, 
    photoPost,
    handleBackToEditor,
    handleNextToPublishButton,
  }: {
    handleModalClose?: () => void
    photoPost: PhotoType[]
    handleBackToEditor: (filterPhotoList: PhotoType[]) => void
    handleNextToPublishButton: (filterPhotoList: PhotoType[]) => void
  }) => {

    // const [newFilter, setNewFilter] = useState('')
    const [photo, setPhoto] = useState(photoPost[0])
    const [filterPhotoList, setFilterPhotoList] = useState<PhotoType[]>([])

  console.log(photoPost)    

    // let photoUrl = photoList[0]
    // let photoUrl = ''
    // if (photo && typeof photo !== 'string') {
    //     photoUrl = URL.createObjectURL(photo)
    // } else if (typeof photo == 'string') {
    //     photoUrl = photo
    // }  

  const handleFilter = (filter: string, newPhoto: string) => {
      // setNewFilter(filter)
      const filterPhotoPost = photoPost.map((el) => {
        if(el.photoUrl == photo.photoUrl) {
          el.filter = filter
        }
        return el
      })
      setFilterPhotoList(filterPhotoPost)
      console.log(filterPhotoPost)
      
      // let newFilterList = filterPhotoList.map((el, index) => {
      //   if(photoPost[index] == photoUrl ) {
      //     console.log(index)
      //     el = newPhoto
      //   }      //   return el
      // })
      // setFilterPhotoList(newFilterList)
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
        <StyledFiltersContainer key={photo.photoUrl}>
          {filtersList.map( (el, index) => 
            <FilterElement 
              key={index} 
              filter={el.filter} 
              filterTitle={el.filterTitle} 
              photoUrl={photo.photoUrl} 
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
