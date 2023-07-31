import React, {useState} from "react";
import PostPhotoSelectModal from "./PostPhotoSelectModal";
import FilterModal from "./FilterModal";
import PostDescriptionModal from "./PostDescriptionModal";
import PostResizeModal from "./PostResizeModal";

const PostCreationModal = ({
    handleEditorClose,
    handleFullScreen,
  }: {
    handleEditorClose: () => void;
    handleFullScreen: (full: boolean) => void;
  }) => {
  const [openComp, setOpenComp] = useState(true); // начальное значение для rotate
  const [photoPost, setPhotoPost] = useState<PhotoType[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false) // открытие модального окна для наложения фильтров
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false) // открытие модального окна для описания поста
  const [openResize, setOpenResize] = useState(false) // открытие окна изменения размеров изображения
 
  const [photoFile, setPhotoFile] = useState<File>(); // изображение, передаваемое в компоненту редактирования

  // const [createPostHandler] = useCreatePostMutation();

  // const cropRef = useRef<AvatarEditor | null>(null);

  // const create = () => {
  //   const formData = new FormData();
  //   formData.append("description", "dsgasdg dsagsda gsda g");
  //   photoPost.map((photo) => formData.append("posts", photo as File));

  //   createPostHandler(formData);
  // };

  // Сохранение значений в локальный state при перемещении бегунка
  // const handleSlider = (setState: (arg: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target) {
  //       setState(parseInt(e.target.value));
  //     }
  //   };

  // // Обработчик сохранени отредактированного изображения
  // const handleSave = async () => {
  //   // подготовка данных
  //   if (cropRef.current) {
  //     const avatar = cropRef.current.getImage().toDataURL();

  //     // преобразование base64 в file
  //     const result = await fetch(avatar);
  //     const blob = await result.blob();
  //     const file = new File([blob], "avatar", {type: "image/png"});

  //     // преобразование file в FormData
  //     const formData = new FormData();
  //     formData.append("avatar", file as File);
  //     // setPhotoPost((prev) => [...prev, file]);

  //     const newList = [...photoPost, {photoUrl: avatar, filter: ''}]
  //     setPhotoPost(newList)
  //     debugger
  //     try {

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleNextToResize = () => {
    setOpenComp(false)
    setOpenResize(true)
  }

  const handleAddPhotoButton = () => {
    setOpenComp(true)
    setOpenResize(false)
  }

  const handleNextToFilterButton = () => {
    setIsFilterOpen(true)
    setOpenResize(false)
  }

  const handleNextToPublishButton = (photoPost: PhotoType[]) => {
    setIsDescriptionOpen(true)
    setIsFilterOpen(false)
    setPhotoPost(photoPost)
  }

  const handleBackToEditor = (photoPost: PhotoType[]) => {
    setOpenResize(true)
    setIsFilterOpen(false)
    console.log('photo after filter', photoPost)
    setPhotoPost(photoPost)
  }

  const handleBackToFilters = (photoPost: PhotoType[]) => {
    setIsFilterOpen(true)
    setIsDescriptionOpen(false)
    setPhotoPost(photoPost)
  }

  return (
    <>
      {openComp && <PostPhotoSelectModal
          handleModalClose={() => {
          }}
          avatar={""}
          handleFullScreen={handleFullScreen}
          setPhotoFile={setPhotoFile}
          handleNextToResize={handleNextToResize}
        />
      }
      {openResize && photoFile && <PostResizeModal 
          photoFile={photoFile}
          handleEditorClose={handleEditorClose}
          handleFullScreen={handleFullScreen}
          handleNextToFilterButton={handleNextToFilterButton}
          handleAddPhotoButton={handleAddPhotoButton}
          setPhotoPost={setPhotoPost}
          photoPost={photoPost}
        />
      }
      {isFilterOpen && <FilterModal 
          handleBackToEditor={handleBackToEditor} 
          handleNextToPublishButton={handleNextToPublishButton} 
          photoPost={photoPost}
        />
      }
      {isDescriptionOpen && (
        <PostDescriptionModal handleBackToFilters = {handleBackToFilters} handleModalClose={handleEditorClose} photoPost={photoPost}/>
      )}
    </>
  );
};

// Стили
export default PostCreationModal;

export type PhotoType = {
  photoUrl: string
  filter: string
}