import React from 'react'

import { Path } from 'common/enums/path'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import github from '../../public/img/icons/github-svgrepo-com.svg'
import google from '../../public/img/icons/google-svgrepo-com.svg'
import { baseTheme } from '../../styles/styledComponents/theme'

const AuthIcons = () => {
  const { push } = useRouter()

  return (
    <StyledIconBlock>
      <Link
        href="/api/auth/signin"
        onClick={async e => {
          e.preventDefault()
          push(Path.SIGNIN)
        }}
      >
        <Image alt="google" height={36} src={google} width={36} />
        <Image alt="github" height={36} src={github} width={36} />
      </Link>
      <Message>SignIn with Google or Github</Message>
    </StyledIconBlock>
  )
}

export default AuthIcons

const StyledIconBlock = styled.div`
  position: relative;
  max-width: 132px;
  width: 100%;
  margin: 10px 50px 20px 50px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 60px;

  &:hover div {
    display: block;
    text-align: center;
  }
`

const Link = styled.a`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Message = styled.div`
  position: absolute;
  top: -90px;
  left: 16px;
  display: none;
  color: ${baseTheme.colors.warning[100]};
  background: ${baseTheme.colors.dark[300]};
  opacity: 0.9;
  padding: 10px;
  border-radius: 2px;
  font-family: Inter;
`
