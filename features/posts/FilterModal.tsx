import FilterElement from "./FilterElement";
import { useState } from "react";
import { filtersList } from "common/utils/filters";
import { ImageToolModal } from "common/hoc/ImageToolModal";

const FilterModal = ({
    handleModalClose, 
    photoPost,
    handleBackToEditor,
    handleNextToPublishButton,
  }: {
    handleModalClose?: () => void
    photoPost: string []
    handleBackToEditor: (photoPost: string[]) => void
    handleNextToPublishButton: (photoPost: string[]) => void
  }) => {

    const [newFilter, setNewFilter] = useState('')
    const [photoUrl, setPhotoUrl] = useState(photoPost[0])

    // let photoUrl = photoList[0]
    // let photoUrl = ''
    // if (photo && typeof photo !== 'string') {
    //     photoUrl = URL.createObjectURL(photo)
    // } else if (typeof photo == 'string') {
    //     photoUrl = photo
    // }  

  const handleFilter = (filterTitle: string) => {
      setNewFilter(filterTitle)
  }

  const handleBack = () => {
    handleBackToEditor(photoPost)
  }

  const handleNextButton = () => {
    handleNextToPublishButton(photoPost)
  }

  return (
    <ImageToolModal 
      handleModalClose={handleModalClose} 
      photoPost={photoPost} 
      handleBack={handleBack}
      newFilter={newFilter}
      title='Filters'
      setPhotoUrl={setPhotoUrl}
      photoUrl={photoUrl}
      nextStep='Next'
      handleNextStepButton={handleNextButton}
      >
      {filtersList.map( (el, index) => 
        <FilterElement 
            key={index} 
            filter={el.filter} 
            filterTitle={el.filterTitle} 
            photoUrl={photoUrl} 
            handleFilter={handleFilter}
        />)}
    </ImageToolModal>
  )
}

export default FilterModal
