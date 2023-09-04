import { FC, useState } from 'react'

import { useLogoutMutation } from 'assets/store/api/auth/authApi'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import { Path } from '../../../enums/path'
import { ThemeButton } from '../../../enums/themeButton'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { Button } from '../../Button/Button'
import Modal from '../../Modals/ModalPublic/Modal'
import { AppLink } from '../AppLink/AppLink'

export const LogoutLink: FC = () => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
  const [logOutHandler] = useLogoutMutation()
  const { clearAll, getItem } = useLocalStorage()
  const { t } = useTranslation('nav_bar')
  const router = useRouter()

  const userEmail = getItem('userEmail')

  const logoutHandler = async () => {
    try {
      await logOutHandler()
        .unwrap()
        .then(() => {
          clearAll()
          router.push(Path.LOGIN)
        })
    } catch {
      console.log('log out error')
    }
  }

  const onClose = () => {
    setIsOpenModalEdit(false)
  }
  const [hovered, setHovered] = useState(true)

  const handleMouseEnter = () => {
    setHovered(false)
  }

  const handleMouseLeave = () => {
    setHovered(true)
  }

  return (
    <>
      <AppLink href="" onClick={() => setIsOpenModalEdit(true)}>
        <StyledDiv>
          <Image alt="logOut" height={24} src="/img/icons/log-out.svg" width={24} />
          <p>{t('log_out')}</p>
        </StyledDiv>
      </AppLink>
      {isOpenModalEdit && (
        <Modal
          bodyText={`Are you really want to log out of your account "${userEmail}"`}
          handleModalClose={onClose}
          title="Log Out"
          width="440px"
        >
          <>
            <Button
              theme={hovered ? ThemeButton.PRIMARY : ThemeButton.OUTLINED}
              width="96px"
              onClick={logoutHandler}
              onMouseEnter={handleMouseLeave}
              onMouseLeave={handleMouseEnter}
            >
              Yes
            </Button>
            <Button
              theme={hovered ? ThemeButton.OUTLINED : ThemeButton.PRIMARY}
              width="96px"
              onClick={onClose}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              No
            </Button>
          </>
        </Modal>
      )}
    </>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
  align-items: center;
`
