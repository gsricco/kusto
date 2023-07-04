import React from 'react';
import {getLayout} from "../../../common/components/Layout/BaseLayout/BaseLayout";
import {Button, ThemeButton} from "../../../common/components/Button/Button";
import {WrapperContainerAuth} from "../../../features/auth/WrapperContainerAuth";
import {Formik} from "formik";
import AuthIcons from "../../../features/auth/AuthIcons";
import {
  StyledAuthForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled";
import {useShowPassword} from "../../../common/hooks/useShowPassword";
import {useLoginMutation} from "../../../assets/store/api/auth/authApi";
import {FormValueLogin, ResetForm} from "../../../common/components/Formik/types";
import {FormikLabel} from "../../../common/components/Formik/FormikLabel";
import showPasswordBtn from "../../../public/icons/eye-outline.svg";
import hidePasswordBtn from "../../../public/icons/eye-off-outline.svg";
import {validateLogin} from "../../../common/utils/validateLogin";
import {loadState, saveState} from '../../../common/components/localStorage/localStorage';
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from '../../../common/components/localStorage/types';
import {useRouter} from "next/router";
import {
  StyledContainerAuth,
  StyledForgotLink,
  StyledLinkBlock
} from "../../../styles/styledComponents/auth/Auth.styled";


const Login = () => {
  const route = useRouter()
  const token = loadState(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  const profile = false

  console.log('token profile', token, profile)

  const {
    passwordType,
    showPassword,
  } =
    useShowPassword()

  const initialAuthValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    loginOrEmail: ""
  }

  const [loginHandler, {data}] = useLoginMutation()
  if (data) {
    saveState(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.accessToken)
  }

  const handleSubmit = async (values: FormValueLogin, {resetForm}: ResetForm) => {

    const data = {
      loginOrEmail: values.loginOrEmail,
      password: values.password,
    }
    try {
      const res = await loginHandler(data)
      console.log('LOGIN', res)
      alert('Шалунишка!!! Авторизуйся!!!! Сделать проверку на вход и переход по профилю ')

      //   route.push('/login')
      // } else {
      resetForm()
        !profile ? route.push('/profile/settings')
          : route.push('/profile')
      // }

    }
catch
  (error)
  {
  }
}

return (
  <StyledContainerAuth>
    <WrapperContainerAuth title={"Sing In"}>
      <AuthIcons/>
      <Formik
        initialValues={initialAuthValues}
        validationSchema={validateLogin}
        onSubmit={handleSubmit}
      >
        {({errors, touched, values, setFieldValue}) => (
          <StyledAuthForm>
            <FormikLabel
              name="loginOrEmail"
              onChange={(e) => setFieldValue("loginOrEmail", e)}
              value={values.loginOrEmail}
              type={"text"}
              title={"login or Email"}
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
              title={"Password"}
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
              <StyledForgotLink href="/recovery">Forgot Password</StyledForgotLink>
            </StyledLinkBlock>
            <Button theme={ThemeButton.PRIMARY} type="submit">
              Sign in
            </Button>
          </StyledAuthForm>
        )}
      </Formik>
      <StyledSignInWrapper>
        <StyledText>Don’t have an account?</StyledText>
        <StyledSignIn href="/registration">Sign up</StyledSignIn>
      </StyledSignInWrapper>
    </WrapperContainerAuth>
  </StyledContainerAuth>
)
}

Login.getLayout = getLayout
export default Login;
