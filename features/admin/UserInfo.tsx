import { Path } from 'common/enums/path'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { styled } from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

const UserInfo = () => {
  const router = useRouter()
  const handleBackToList = () => {
    router.push(Path.ADMIN)
  }

  return (
    <StyledUserInfoContainer>
      <StyledFlexContainer onClick={handleBackToList}>
        <Image alt="arrow" height={24} src="/img/icons/arrow-back-outline.svg" width={24} />
        <StyledBack>Back to Users List</StyledBack>
      </StyledFlexContainer>
      <StyledFlexContainer>
        <StyledImage alt="userPhoto" height={60} src="/img/icons/avatar.svg" width={60} />
        <StyledNameContainer>
          <StyledName>Ivan Yakimenko</StyledName>
          <StyledUserName>Ivan.sr.yakimenko</StyledUserName>
        </StyledNameContainer>
      </StyledFlexContainer>
      <StyledIdDateContainer>
        <StyledIdDate>
          <StyledTitle>UserId</StyledTitle>
          <StyledNumber>21331QErQe21</StyledNumber>
        </StyledIdDate>
        <StyledIdDate>
          <StyledTitle>Profile Creation Date</StyledTitle>
          <StyledNumber>12.12.2022</StyledNumber>
        </StyledIdDate>
      </StyledIdDateContainer>
    </StyledUserInfoContainer>
  )
}

export default UserInfo

const StyledUserInfoContainer = styled.div`
  width: 100%;

  margin-top: 24px;
  margin-bottom: 29px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  color: ${baseTheme.colors.light[100]};
`

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const StyledBack = styled.div`
  line-height: 24px;
  font-weight: 500px;
  font-size: 14px;
  margin: 0 12px;
`

const StyledImage = styled(Image)`
  border-radius: 30px;
`
const StyledNameContainer = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;

  margin: 0 24px;
  padding: auto;
`
const StyledName = styled.h1`
  line-height: 36px;
  font-weight: 700px;
  font-size: 20px;
`
const StyledUserName = styled.div`
  line-height: 24px;
  font-weight: 400px;
  font-size: 14px;

  text-decoration: underline;
`

const StyledIdDateContainer = styled.div`
  display: flex;
  gap: 12px;
`
const StyledIdDate = styled.div`
  min-width: 172px;
  display: flex;
  flex-direction: column;
`
const StyledTitle = styled.div`
  line-height: 24px;
  font-weight: 400px;
  font-size: 14px;
  color: ${baseTheme.colors.light[900]};
`

const StyledNumber = styled.div`
  line-height: 24px;
  font-weight: 400px;
  font-size: 16px;
`
