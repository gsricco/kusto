import React, {FC, useState} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {AppLink} from '../AppLink/AppLink';
import {Button} from "../../Button/Button";
import {ThemeButton} from "../../../enums/themeButton";
import {useRouter} from "next/router";
import {ModalPost} from "../../Modals/ModalPosts/ModalPost";
import {StyledDiv} from "../Navbar.styled";
import PhotoSelectModal from "../../../../features/profile/PhotoSelectModal";
import PostPhotoSelectModal from "../../../../features/posts/PostPhotoSelectModal";


export const CreatePost: FC = () => {

  // Достать фото поста если надо - сделать запрос
  const data = {
    // photo:'/img/icons/person-remove.svg'
    photo:''
  }



  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [isNextHeader, setIsNext] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState({
    photoModal: false, // открытие модального окна выбора аватарки
    saveProfileModal: false // открытие модального окна при сохранении изменений
  });
  const closeModal =()=>{
    setIsOpenModalEdit(false)
  }
const handleClickNext =()=>{
    alert('Next')
  }
const handleClickBack =()=>{
    alert('Back')
  }

  const handleModalClose = () => {
    setIsModalOpen({ photoModal: false, saveProfileModal: false });
  };

  const handleFullScreen = (full:boolean)=>{
    setFullScreen(full)
  }
  const changeHeader = (isNextHeader:boolean)=>{
    setIsNext(isNextHeader)
  }

  return (
    <>
      <AppLink onClick={() => setIsOpenModalEdit(true)} href={''}>
        <StyledDiv>
          <Image
            src={'/img/icons/plus-square.svg'}
            alt={'CreatePost'}
            width={24}
            height={24}
          />
          <p>Create</p>
        </StyledDiv>
      </AppLink>
      {isOpenModalEdit && (
        <ModalPost
          handleModalClose={closeModal}
          handleModalNext={handleClickNext}
          handleModalBack={handleClickBack}
          title={isNextHeader ? 'Add Photo' : undefined}
          nextTitle={isNextHeader ? undefined: 'Next title'}
          // bodyText={`Are you really want to log out of your account `}
          width={fullScreen?'100%':'492px'}
          height={fullScreen?'100%':'564px'}
        >
          <>
            <PostPhotoSelectModal handleModalClose={handleModalClose} avatar={data?.photo} handleFullScreen={handleFullScreen} changeHeader={changeHeader}/>
          </>

        </ModalPost>
      )}
    </>
  )
}
