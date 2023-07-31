import React, { FC, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { AppLink } from "../AppLink/AppLink";
import { Button } from "../../Button/Button";
import { ThemeButton } from "../../../enums/themeButton";
import { useRouter } from "next/router";
import { ModalPost } from "../../Modals/ModalPosts/ModalPost";
import { StyledDiv } from "../Navbar.styled";
import PhotoSelectModal from "../../../../features/profile/PhotoSelectModal";
import PostPhotoSelectModal from "../../../../features/posts/PostPhotoSelectModal";
import {
  StyledCloseButton,
  StyledCloseNextButton,
  StyledModalContainer,
  StyledModalHeader,
  StyledModalHeaderNext,
  StyledModalOverlay,
  StyledModalTitle,
  StyledModalTitleNext
} from "../../Modals/Modal.styled";
import { Provider } from "react-redux";
import { store } from "assets/store/store";
import PostCreationModal from "features/posts/PostCreationModal";

export const CreatePost: FC = () => {
  // Достать фото поста если надо - сделать запрос
  const data = {
    // photo:'/img/icons/person-remove.svg'
    photo: ""
  };

  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModalEdit(false);
  };

  const handleFullScreen = (full: boolean) => {
    setFullScreen(full);
  };

  return (
    <>
      <Provider store={store}>
        <AppLink onClick={() => setIsOpenModalEdit(true)} href={""}>
          <StyledDiv>
            <Image src={"/img/icons/plus-square.svg"} alt={"CreatePost"} width={24} height={24} />
            <p>Create</p>
          </StyledDiv>
        </AppLink>
        {isOpenModalEdit && (
          <StyledModalOverlay>
            <StyledModalContainer
              width={fullScreen ? "100%" : "492px"}
              height={fullScreen ? "100%" : "564px"}
            >
              <PostCreationModal 
                handleEditorClose={closeModal}
                handleFullScreen={handleFullScreen}
              />
            </StyledModalContainer>
          </StyledModalOverlay>
        )}
      </Provider>
    </>
  );
};
