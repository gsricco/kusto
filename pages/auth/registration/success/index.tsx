import React from "react"
import {Button, ThemeButton} from "../../../../common/components/Button/Button"
import {StyledSignInWrapper, StyledText} from "../../../../styles/styledComponents/auth/FormikAuth.styled"
import {WrapperContainerNoFrame} from "../../../../features/auth/WrapperContainerNoFrame"
import VectorImage from "../../../../common/components/VectorImage"
import {useRouter} from 'next/router';
import mail from "../../../../public/icons/web-app-ui-sign-up-bro.svg";
import {
  StyledContainerAuth,
  StyledContainerButton,
  StyledImage
} from "../../../../styles/styledComponents/auth/Auth.styled";
import {getLayout} from "../../../../common/components/Layout/BaseLayout/BaseLayout";

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

const SuccessRegistration = () => {
  const router = useRouter();
  const {t} = useTranslation()    // функция перевода на выбранный язык

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={t("congrat")}>

        <StyledSignInWrapper>
          <StyledText>{t("email_confirm")}</StyledText>
        </StyledSignInWrapper>
        <StyledContainerButton>
          <Button theme={ThemeButton.PRIMARY} width="182px" onClick={handleClick} type="button">
            {t("sign_in")}
          </Button>
        </StyledContainerButton>

        <StyledImage>
          <VectorImage image={mail} screenWidth={447} imageWidth={423} />
        </StyledImage>

      </WrapperContainerNoFrame>
    </StyledContainerAuth>
  )
}

SuccessRegistration.getLayout = getLayout

export default SuccessRegistration
