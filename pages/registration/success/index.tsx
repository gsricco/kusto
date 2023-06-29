import React from "react"
import { getLayout } from "../../../components/Layout/BaseLayout/BaseLayout"
import { Button, ThemeButton } from "../../../components/Button/Button"
import {
  StyledContainerAuth, 
  StyledSignInWrapper,
  StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled"
import { WrapperContainerNoFrame } from "components/Wrappers/Auth/WrapperContainerNoFrame"
import SuccessIcon from "components/Wrappers/Auth/SuccessIcon"
import styled from "styled-components"
import { useRouter } from 'next/router';


const SuccessRegistration = () => {
  const router = useRouter();

    const handleClick = () => {
    router.push('/login');
    };

  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={"Congratulations!"}>

        <StyledSignInWrapper>
          <StyledText>Your email has been confirmed</StyledText>
        </StyledSignInWrapper>
<StyledContainerButton>
  <Button theme={ThemeButton.PRIMARY} width="182px" onClick={handleClick } type="button">
          Sign in
        </Button>
</StyledContainerButton>     

      <SuccessIcon/>

      </WrapperContainerNoFrame>
    </StyledContainerAuth>
  )
}

export const StyledContainerButton = styled.div
  `
  margin-top: 38px;   
  `

SuccessRegistration.getLayout = getLayout

export default SuccessRegistration
