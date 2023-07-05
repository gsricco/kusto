import React from 'react';
import {Formik} from "formik";

import showPasswordBtn from "../../../public/icons/eye-outline.svg";
import hidePasswordBtn from "../../../public/icons/eye-off-outline.svg";

import {useRouter} from "next/router";
import {useLoginMutation} from "../../../assets/store/api/auth/authApi";
import {saveState} from "../../../common/components/localStorage/localStorage";
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from "../../../common/components/localStorage/types";
import {FormValueLogin, ResetForm, SetFieldErrorType} from "../../../common/components/Formik/types";
import {
  StyledContainerAuth,
  StyledForgotLink,
  StyledLinkBlock
} from "../../../styles/styledComponents/auth/Auth.styled";
import {WrapperContainerAuth} from "../../../features/auth/WrapperContainerAuth";
import {
  StyledAuthForm,
  StyledShowPasswordBtn, StyledSignIn,
  StyledSignInWrapper, StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled";
import AuthIcons from "../../../features/auth/AuthIcons";
import {useShowPassword} from "../../../common/hooks/useShowPassword";
import {validateLoginEn, validateLoginRu} from "../../../common/utils/validateLogin";
import {FormikLabel} from "../../../common/components/Formik/FormikLabel";
import {Button, ThemeButton} from "../../../common/components/Button/Button";
import {getLayout} from "../../../common/components/Layout/BaseLayout/BaseLayout";
//translate import
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticPropsContext} from "next"
import config from '../../../next-i18next.config.js'
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
const Login = () => {
  const {t, i18n} = useTranslation()    // функция перевода на выбранный язык
  const route = useRouter()
  const {code} = route.query       // получение кода восстановления для сервера
  const {
    passwordType,
    showPassword,
  } =
    useShowPassword()

  const initialAuthValues = {
    password: "",
    loginOrEmail: ""
  }

  const [loginHandler, {data}] = useLoginMutation()

  if (data) {
    saveState(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.accessToken)
    data.profile ? route.push('/profile'):route.push(`/profile/settings?login=${'LOGIN'}`)
  }


  const handleSubmit = async (
    values: FormValueLogin,
    { resetForm, setFieldError }: ResetForm & SetFieldErrorType
  ) => {
    const data = {
      loginOrEmail: values.loginOrEmail,
      password: values.password,
    }
    try {
      await loginHandler(data)
        .unwrap()
        .then(() => resetForm())
        .catch(() =>
          setFieldError(
            "password",
            t("log_in_err")
          )
        )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={t("signIn_title")}>
        <AuthIcons/>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={i18n.language == 'en' ? validateLoginEn : validateLoginRu}
          onSubmit={handleSubmit}
        >
          {({errors, touched, values, setFieldValue}) => (
            <StyledAuthForm>
              <FormikLabel
                name="loginOrEmail"
                onChange={(e) => setFieldValue("loginOrEmail", e)}
                value={values.loginOrEmail}
                type={"text"}
                title={t("email_label")}
                border={errors.loginOrEmail?.length && touched.loginOrEmail ? "red" : "white"}
                errors={errors}
                touched={touched}
              />
              <FormikLabel
                id="pass"
                name="password"
                onChange={(e) => setFieldValue("password", e)}
                value={values.password}
                type={passwordType}
                title={t("password_label")}
                border={errors.password?.length && touched.password ? "red" : "white"}
                errors={errors}
                touched={touched}
              >
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPassword()}
                />
              </FormikLabel>
              <StyledLinkBlock>
                <StyledForgotLink href="/auth/recovery">{t("forgotPassword_link")}</StyledForgotLink>
              </StyledLinkBlock>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                {t("signIn_title")}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledText>{t("notAccount_title")}</StyledText>
          <StyledSignIn href="/auth/registration">{t("signUp_link")}</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

Login.getLayout = getLayout
export default Login;

