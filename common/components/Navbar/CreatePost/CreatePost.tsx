import {FC, useState} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {AppLink} from '../AppLink/AppLink';
import {Button} from "../../Button/Button";
import {ThemeButton} from "../../../enums/themeButton";
import {useRouter} from "next/router";
import {ModalPost} from "../../Modals/ModalPosts/ModalPost";
import {StyledDiv} from "../Navbar.styled";


export const CreatePost: FC = () => {

  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)

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
          width={'440px'}
          height={'440px'}
        >
          <>
            children
          </>

        </ModalPost>
      )}
    </>
  )
}
