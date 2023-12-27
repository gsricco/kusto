/* eslint-disable no-nested-ternary */
/* eslint-disable no-magic-numbers */
import React, { useState } from 'react'

import { UserProfileType } from 'assets/store/api/profile/types'
import { Button } from 'common/components/Button/Button'
import { mediaSizes } from 'common/constants/Profile/mediaSizes'
import { Path } from 'common/enums/path'
import { ThemeButton } from 'common/enums/themeButton'
import { useWindowSize } from 'common/hooks/useWindowSize'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { TFunction } from 'next-i18next'
import styled from 'styled-components'

import Paid from '../../public/img/icons/paid.svg'

type PropsType = {
  t: TFunction
  user?: UserProfileType | undefined
}

const FollowInfo = ({ amount, text }: { amount: number; text: string }) => {
  return (
    <Column gap="5px">
      <span>{amount}</span>
      <span>{text}</span>
    </Column>
  )
}

const ProfileElement: React.FC<PropsType> = ({ user, t }) => {
  const avatar = '/img/icons/avatar.svg'

  const { width } = useWindowSize() // хук для измерения размера экрана

  const [isVisible, setIsVisible] = useState(true)
  const [isPaid, setIsPaid] = useState(false)
  const router = useRouter()
  /*  ____________<переменные для мобильной версии>______________ */

  const avatarSize = width ? (width < mediaSizes.mobileScreenSize ? 72 : 204) : 204
  const paidImageSize = width ? (width < mediaSizes.mobileScreenSize ? 16 : 24) : 24

  const handleClick = () => {
    router.push(Path.PROFILE_SETTINGS)
  }

  const userFirstName = user?.firstName !== null ? user?.firstName : ''
  const userLastName = user?.lastName !== null ? user?.lastName : ''
  let name = `${userFirstName} ${userLastName}`

  if (!userFirstName || !userLastName) name = 'New User'

  const followData = [
    { amount: 2000, text: t('following') },
    { amount: 2001, text: t('followers') },
    { amount: 2002, text: t('publications') },
  ]

  return (
    <Column style={{ paddingBottom: '50px' }}>
      <Row gap="36px">
        <Avatar
          alt="avatar"
          height={avatarSize}
          src={user?.avatars && user?.avatars.length > 0 ? user?.avatars[0].url : avatar}
          width={avatarSize}
        />

        <Column gap="20px" style={{ flexGrow: '1' }}>
          <SpaceBetween>
            <Name>{name}</Name>
            <Button
              style={{ padding: '6px 24px' }}
              theme={ThemeButton.SECONDARY}
              type="button"
              width="auto"
              onClick={handleClick}
            >
              {t('profile_settings')}
            </Button>
          </SpaceBetween>
          <Row gap="80px">
            {followData.map(({ amount, text }) => (
              <FollowInfo key={text} amount={amount} text={text} />
            ))}
          </Row>
          <AboutMe>{user?.aboutMe || t('about_me')}</AboutMe>
        </Column>
      </Row>
      <UserInfoMobile>
        <Name>{name}</Name>
        <AboutMeMobile>{user?.aboutMe || t('about_me')}</AboutMeMobile>
      </UserInfoMobile>
    </Column>
  )
}

export default ProfileElement

export const Avatar = styled(Image)`
  border-radius: 50%;
`

export const AboutMe = styled.p`
  text-align: justify;
  word-break: break-all;

  @media (max-width: 960px) {
    display: none;
  }
`

export const AboutMeMobile = styled(AboutMe)`
  display: none;

  @media (max-width: 960px) {
    display: block;
  }
`

export const Column = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => (props.gap ? props.gap : '0px')};
`

export const Row = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${props => (props.gap ? props.gap : '0px')};

  @media (max-width: 960px) {
    gap: ${props => (props.gap === '80px' ? '30px' : '20px')};
    align-items: center;
  }
`
export const SpaceBetween = styled(Row)`
  justify-content: space-between;
  align-items: center;

  @media (max-width: 960px) {
    display: none;
  }
`

export const Name = styled.p`
  font-size: 20px;
  font-weight: 700;

  @media (max-width: 960px) {
    font-size: 16px;
    padding-top: 5px;
  }
`

export const UserInfoMobile = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    gap: 13px;
  }
`
