import React, {useState} from "react";
import PostPhotoSelectModal from "./PostPhotoSelectModal";
import FilterModal from "./FilterModal";
import PostDescriptionModal from "./PostDescriptionModal";
import PostResizeModal from "./PostResizeModal";

const PostPhotoEditorModal = ({
    // photo,
    handleEditorClose,
    handleFullScreen,
    // photoPost1,
  }: {
    // photo: File;
    handleEditorClose: () => void;
    handleFullScreen: (full: boolean) => void;
    // photoPost1: PhotoType[];
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
          isHeaderOpen={false}
          isHeader2Open={true}
          photoPostProps={photoPost}
          setPhotoFile={setPhotoFile}
          handleNextToResize={handleNextToResize}
        />
      }
      {openResize && photoFile && <PostResizeModal 
          // photo={photo}
          photoFile={photoFile}
          handleEditorClose={handleEditorClose}
          handleFullScreen={handleFullScreen}
          // photoPost1={photoPost1}
          handleNextToFilterButton={handleNextToFilterButton}
          handleAddPhotoButton={handleAddPhotoButton}
          // setOpenComp={setOpenComp}
          setPhotoPost={setPhotoPost}
          photoPost={photoPost}
        
        />
        
        // <>
        //   <StyledModalHeaderNext>
        //     <StyledCloseNextButton onClick={() => alert("handleModalBack")}>
        //       <Image
        //         priority
        //         src="/img/icons/arrow-ios-back.svg"
        //         height={24}
        //         width={24}
        //         alt="close"
        //       />
        //     </StyledCloseNextButton>
        //     <StyledModalTitleNext>{"Cropping"}</StyledModalTitleNext>
        //     <Button theme={ThemeButton.CLEAR} onClick={handleNextToFilterButton}>
        //       Next
        //     </Button>
        //   </StyledModalHeaderNext>
        //   <StyledPhotoEditor full={full}>
        //     <AvatarEditor // width и height задается в styled component с учетом border
        //       ref={cropRef}
        //       image={photo}
        //       color={[23, 23, 23, 0]}
        //       scale={value / 10}
        //       style={{
        //         width: full ? "90vh" : sizePhoto.width,
        //         height: full ? "90vh" : sizePhoto.height,
        //         left: "30px"
        //       }}
        //     />
        //   </StyledPhotoEditor>
        //   {openZoom && (
        //   <StyledSliderContainer>
        //     <label htmlFor="zoom"></label>
        //     <Slider
        //       min="10"
        //       max="50"
        //       id="zoom"
        //       onInput={handleSlider(setValue)}
        //       onChange={handleSlider(setValue)}
        //       value={value}
        //       type="range"
        //       style={{
        //         width: "45%",
        //         "--min": 10,
        //         "--max": 50,
        //         "--val": value
        //       }}
        //     />
        //   </StyledSliderContainer>
        //   )}
        //   {resize && (
        //     <StyledResizeBlock>
        //       <StyleItemSize onClick={()=>setSizePhoto({width:'90%', height:'90%'})}>
        //         <StyledIconSize src={addPhoto} alt={fullScreen}/> <span>original</span>
        //       </StyleItemSize>
        //       <StyleItemSize onClick={()=>setSizePhoto({width:'90%', height:'90%'})}>
        //         <StyledIconSize src={resize11} alt={fullScreen}/>1:1
        //       </StyleItemSize>
        //       <StyleItemSize onClick={()=>setSizePhoto({width:'40%', height:'50%'})}>
        //         <StyledIconSize src={resize45} alt={fullScreen}/>4:5
        //       </StyleItemSize>
        //       <StyleItemSize onClick={()=>setSizePhoto({width:'90%', height:'50%'})}>
        //         <StyledIconSize src={resize169} alt={fullScreen}/>16:9
        //       </StyleItemSize>
        //     </StyledResizeBlock>
        //   )}
        //   {openAddPhoto && (
        //     <StyledAddBlock>
        //       <StyledPhotoPost id={"scrollable-container"}>
        //         {photoPost.map((photo, index) => (
        //           <SmallPhoto
        //             photo={photo.photoUrl}
        //             key={index}
        //             index={index}
        //             removePhotoFromList={removePhotoFromList}
        //           />
        //         ))}
        //       </StyledPhotoPost>
        //       <div onClick={() => setOpenComp(true)}>
        //         <StyledIconPlusPhoto src={plusPhoto} alt={fullScreen}/>
        //       </div>
        //     </StyledAddBlock>
        //   )}
        //   <div onClick={handleClickFullScreen}>
        //     <StyledIconFullScreen src={full ? fullScreenOn : fullScreen} alt={fullScreen}/>
        //   </div>

        //   <div onClick={() => setResize(!resize)}>
        //     <StyledIconResize src={resize ? resizePhotoOn : resizePhoto} alt={fullScreen}/>
        //   </div>


        //   <div onClick={() => setOpenZoom(!openZoom)}>
        //     <StyledIconZoom src={!openZoom ? zoom : zoomOn} alt={zoom}/>
        //   </div>
        //   <div
        //     onClick={() => {
        //       setOpenAddPhoto(!openAddPhoto);
        //       if(!openAddPhoto) {
        //         handleSave();
        //       }
        //     }}
        //   >
        //     <StyledIconAddPhoto
        //       src={!openAddPhoto ? addPhoto : addPhotoOn}
        //       alt={addPhoto}
        //       full={full}
        //     />
        //   </div>
        // </>
      }
      {isFilterOpen && (
        <FilterModal handleBackToEditor={handleBackToEditor} handleNextToPublishButton={handleNextToPublishButton} photoPost={photoPost}/>
      )}
      {isDescriptionOpen && (
        <PostDescriptionModal handleBackToFilters = {handleBackToFilters} handleModalClose={handleEditorClose} photoPost={photoPost}/>
      )}
    </>
  );
};

// Стили
export default PostPhotoEditorModal;

export type PhotoType = {
  photoUrl: string
  filter: string
}