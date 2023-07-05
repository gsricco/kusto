import React from "react"
import { getLayout } from "../../../../common/components/Layout/BaseLayout/BaseLayout"
import { Button, ThemeButton } from "../../../../common/components/Button/Button"
import {
  StyledTextWrapper,
  StyledCenteredText
} from "../../../../styles/styledComponents/auth/FormikAuth.styled"
import { WrapperContainerNoFrame } from "../../../../features/auth/WrapperContainerNoFrame"
import VectorImage from "../../../../common/components/VectorImage"
import styled from "styled-components"
import { useRouter } from 'next/router';
import overtime from "../../../../public/icons/web-app-ui-time-management-rafiki.svg";
import { StyledContainerAuth, StyledContainerButtonVer, StyledImageVer } from "styles/styledComponents/auth/Auth.styled"

//translate import
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticPropsContext} from "next"
import config from 'next-i18next.config.js'
import {useTranslation} from 'next-i18next'
//

// getStaticProps Определения языка, указанного в url
export async function getStaticProps(context: GetStaticPropsContext) {
  const {locale} = context as any

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config)),
    }
  }
}

const Verification = () => {
  const router = useRouter();
  const {t} = useTranslation()    // функция перевода на выбранный язык

  const handleClick = () => {
    router.push('/auth/registration');
  };

  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={t("link_exp_title")}>

        <StyledTextWrapper>
          <StyledCenteredText>{t("link_exp_text")}</StyledCenteredText>
        </StyledTextWrapper>
        <StyledContainerButtonVer>
          <Button theme={ThemeButton.PRIMARY} width="auto" onClick={handleClick} type="button">
          {t("resend_btn")}
          </Button>
        </StyledContainerButtonVer>

        <StyledImageVer>
          <VectorImage image={overtime} screenWidth={447} imageWidth={423} />
        </StyledImageVer>

      </WrapperContainerNoFrame>
    </StyledContainerAuth>
  )
}

export const StyledContainerButton = styled.div
  `
  margin-top: 10px;   
  `
const StyledImage = styled.div
  `
  margin-top: 25px; 
  `

Verification.getLayout = getLayout

export default Verification
