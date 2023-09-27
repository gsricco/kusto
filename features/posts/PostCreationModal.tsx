import { useState } from 'react'

import Modal from 'common/components/Modals/ModalPublic/Modal'
import { useOutsideClick } from 'common/hooks/useOutsideClick'
import styled from 'styled-components'

import FilterModal from './FilterModal'
import PostDescriptionModal from './PostDescriptionModal'
import PostPhotoSelectModal from './PostPhotoSelectModal'
import PostResizeModal from './PostResizeModal'

///  //  Модальное окно для создания поста: выбор изображений,       //  ///
//     наложение фильтров,  изменение размеров, добавление описания        //

const PostCreationModal = ({
  handleEditorClose,
  handleFullScreen,
  setIsOpenModalEdit,
}: {
  handleEditorClose: () => void
  handleFullScreen: (full: boolean) => void
  setIsOpenModalEdit: (state: boolean) => void
}) => {
  const [openComp, setOpenComp] = useState(true) // открытие модального окна для выбора изображения
  const [photoPost, setPhotoPost] = useState<PhotoType[]>([]) // массив объектов с параметрами изображения
  const [isFilterOpen, setIsFilterOpen] = useState(false) // открытие модального окна для наложения фильтров
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false) // открытие модального окна для описания поста
  const [openResize, setOpenResize] = useState(false) // открытие модального окна изменения размеров изображения
  const [photoFile, setPhotoFile] = useState<File | string>() // изображение, передаваемое в компоненту редактирования

  // Обработчик перехода из окна выбора изображения в окно изменения размеров
  const handleNextToResize = () => {
    setOpenComp(false)
    setOpenResize(true)
  }

  // Обработчик перехода из окна изменения размеров в окно выбора изображения
  const handleAddPhotoButton = () => {
    setOpenComp(true)
    setOpenResize(false)
  }

  // Обработчик перехода из окна изменения размеров в окно наложения фильтров
  const handleNextToFilterButton = () => {
    setIsFilterOpen(true)
    setOpenResize(false)
  }

  // Обработчик перехода из окна наложения фильтров в окно добавления описания
  const handleNextToPublishButton = (newPhotoPost: PhotoType[]) => {
    setIsDescriptionOpen(true)
    setIsFilterOpen(false)
    setPhotoPost(newPhotoPost)
  }

  // Обработчик перехода из окна наложения фильтров в окно изменения размеров
  const handleBackToEditor = (newPhotoPost: PhotoType[]) => {
    setOpenResize(true)
    setIsFilterOpen(false)
    setPhotoPost(newPhotoPost)
  }

  // Обработчик перехода из окна добавления описания в окно наложения фильтров
  const handleBackToFilters = (newPhotoPost: PhotoType[]) => {
    setIsFilterOpen(true)
    setIsDescriptionOpen(false)
    setPhotoPost(newPhotoPost)
  }

  const [closeCreation, setCloseCreation] = useState(false)

  const ref = useOutsideClick(() => {
    setCloseCreation(true)
  })

  const handleDiscardDraft = () => {
    setIsOpenModalEdit(false)
  }

  const handleSafeDraft = () => {
    const dbName = 'PostDraft'

    const openRequest = indexedDB.open(dbName, 1)

    openRequest.onerror = () => {
      console.error('Database error')
    }
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result

      if (!db.objectStoreNames.contains('post')) {
        // если хранилище не существует
        db.createObjectStore('post', { autoIncrement: true }) // создаём хранилище
      }

      console.log('store is exist')
    }
    openRequest.onsuccess = () => {
      const db = openRequest.result

      db.onversionchange = () => {
        db.close()
        console.log('База данных устарела, пожалуйста, перезагрузите страницу.')
      }

      const transaction = db.transaction('post', 'readwrite')
      const post = transaction.objectStore('post')
      const request = post.put(photoPost, '1')

      request.onsuccess = () => {
        console.log('Пост добавлен в хранилище', request.result)
        console.log(photoPost)
        setIsOpenModalEdit(false)
      }

      request.onerror = () => {
        console.log('Ошибка', request.error)
      }
    }
    openRequest.onblocked = () => {
      console.log('пожалуйста, перезагрузите страницу.')
    }
  }

  return (
    <>
      {closeCreation && (
        <Modal
          bg="no bg"
          bodyText="Do you really want to close the creation of a publication? If you close everything will be deleted"
          handleCrossClick={() => setCloseCreation(false)}
          height="250px"
          title="Close"
        >
          <>
            <ModalBtn onClick={handleDiscardDraft}>Discard</ModalBtn>
            <ModalBtn onClick={handleSafeDraft}>Save draft</ModalBtn>
          </>
        </Modal>
      )}
      <div ref={ref}>
        {openComp && (
          <PostPhotoSelectModal
            avatar=""
            handleModalClose={handleEditorClose}
            handleNextToResize={handleNextToResize}
            setPhotoFile={setPhotoFile}
            setPhotoPost={setPhotoPost}
          />
        )}
        {openResize && photoFile && (
          <PostResizeModal
            handleAddPhotoButton={handleAddPhotoButton}
            handleFullScreen={handleFullScreen}
            handleNextToFilterButton={handleNextToFilterButton}
            photoFile={photoFile}
            photoPost={photoPost}
            setPhotoPost={setPhotoPost}
          />
        )}
        {isFilterOpen && (
          <FilterModal
            handleBackToEditor={handleBackToEditor}
            handleNextToPublishButton={handleNextToPublishButton}
            photoPost={photoPost}
          />
        )}
        {isDescriptionOpen && (
          <PostDescriptionModal
            handleBackToFilters={handleBackToFilters}
            handleModalClose={handleEditorClose}
            photoPost={photoPost}
          />
        )}
      </div>
    </>
  )
}

// Стили
export default PostCreationModal

export type PhotoType = {
  filter: string
  photoUrl: string
  photoUrlWithFilter: string
}

const ModalBtn = styled.button`
  background: black;
  border: 1px solid #397df6;
  color: #397df6;
  cursor: pointer;
  width: 50px;
  padding: 5px 10px;
  &:hover {
    color: white;
    background: #397df6;
  }
`
