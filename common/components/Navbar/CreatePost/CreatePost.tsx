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

  const closeModal =()=>{
    setIsOpenModalEdit(false)
  }
const handleClickNext =()=>{
    alert('Next')
  }
const handleClickBack =()=>{
    alert('Back')
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
          title={'Add Photo'}
          nextTitle={'Next title'}
          // bodyText={`Are you really want to log out of your account `}
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
