import React from "react"
<<<<<<< HEAD
import { Formik } from "formik"
import showPasswordBtn from "../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg"
import googleIcon from "../../public/icons/google-svgrepo-com.svg"
import githubIcon from "../../public/icons/github-svgrepo-com.svg"
import { SignupSchema } from "utils/registrationValidation"
import {
  StyledBtn,
  StyledContainer,
  StyledErrorMsg,
  StyledForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledSocialMediaIcon,
  StyledSocialMediaWrapper,
  StyledText,
  StyledTitle
} from "styles/styles"
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout"
import Home from "../index"
import { useShowPassword } from "assets/hooks/useShowPassword"
import FormikField from "components/FormikWrapper/FormikField"
import FormLabel from "components/FormikWrapper/FormLabel"
import { Button, ThemeButton } from "components/Button/ui/Button"

export default function Registration() {
  const { passwordType, passwordConfirmationType, showPassword, showPasswordConfirmation } =
    useShowPassword()

  return (
    <StyledContainer>
      <StyledTitle>Sign Up</StyledTitle>
      <StyledSocialMediaWrapper>
        <StyledSocialMediaIcon alt="google-icon" src={googleIcon} />
        <StyledSocialMediaIcon alt="github-icon" src={githubIcon} />
      </StyledSocialMediaWrapper>
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordConfirmation: "",
          email: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values)
          const data = {
            email: values.email,
            password: values.password,
            login: values.username
          }

          try {
            await fetch("https://calypso-one.vercel.app/auth/registration", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(() => console.log("otpravleno"))
            resetForm()
          } catch {
            console.log("err")
          }
        }}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <FormLabel>
              Username
              <FormikField
                name="username"
                border={errors.username?.length && touched.username ? "red" : "white"}
              />
              {errors.username && touched.username ? (
                <StyledErrorMsg>{errors.username}</StyledErrorMsg>
              ) : null}
            </FormLabel>
            <FormLabel id="pass">
              Password
              <FormikField
                name="password"
                type={passwordType}
                border={errors.password?.length && touched.password ? "red" : "white"}
              />
              <StyledShowPasswordBtn
                alt="show password"
                src={passwordType === "password" ? showPasswordBtn : hidePasswordBtn}
                onClick={() => showPassword()}
              />
              {errors.password && touched.password ? (
                <StyledErrorMsg>{errors.password}</StyledErrorMsg>
              ) : null}
            </FormLabel>
            <FormLabel id="pass">
              Password confirmation
              <StyledShowPasswordBtn
                alt="show password"
                src={passwordConfirmationType === "password" ? showPasswordBtn : hidePasswordBtn}
                onClick={() => showPasswordConfirmation()}
              />
              <FormikField
=======
import {Formik} from "formik"
import showPasswordBtn from "../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg"
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout"
import {useShowPassword} from "../../assets/hooks/useShowPassword"
import {validateRegistration} from "../../utils/validateRegistraition"
import AuthIcons from "../../components/Wrappers/Auth/AuthIcons"
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth"
import {Button, ThemeButton} from "../../components/Button/Button"
import {FormikLabel} from "../../components/Formik/FormikLabel"
import {
  StyledAuthForm,
  StyledContainerAuth, StyledShowPasswordBtn, StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "../../styles/styledComponents/auth/FormikAuth.styled"
import {useRegistrationMutation} from "../../store/api/auth/authApi"
import {FormValueRegistration, ResetForm} from "../../components/Formik/types"

export default function Registration() {
  const {
    passwordType,
    passwordConfirmationType,
    showPassword,
    showPasswordConfirmation
  } =
    useShowPassword()

  const initialAuthValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    loginOrEmail: ""
  }

  const [registrationHandler] = useRegistrationMutation()


  const handleSubmit = async (values: FormValueRegistration, {resetForm}: ResetForm) => {
    const data = {
      email: values.email,
      password: values.password,
      login: values.username
    }
    try {
      await registrationHandler(data)
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={"Sing In"}>
        <AuthIcons/>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateRegistration}
          onSubmit={handleSubmit}
        >
          {({
              errors,
              touched,
              values,
              setFieldValue
            }) => (
            <StyledAuthForm>
              <FormikLabel
                name="username"
                onChange={(e) => setFieldValue("username", e)}
                value={values.username}
                type={"text"}
                title={"Username"}
                border={errors.username?.length && touched.username ? "red" : "white"}
                errors={errors}
                touched={touched}
              />
              <FormikLabel
                name="email"
                onChange={(e) => setFieldValue("email", e)}
                value={values.email}
                type={"email"}
                title={"email"}
                border={errors.email?.length && touched.email ? "red" : "white"}
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
              <FormikLabel
                id="pass"
>>>>>>> dev
                name="passwordConfirmation"
                onChange={(e) => setFieldValue("passwordConfirmation", e)}
                value={values.passwordConfirmation}
                type={passwordConfirmationType}
<<<<<<< HEAD
=======
                title={"Password confirmation"}
>>>>>>> dev
                border={
                  errors.passwordConfirmation?.length && touched.passwordConfirmation
                    ? "red"
                    : "white"
                }
<<<<<<< HEAD
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <StyledErrorMsg>{errors.passwordConfirmation}</StyledErrorMsg>
              ) : null}
            </FormLabel>
            <FormLabel>
              Email
              <FormikField
                name="email"
                type="email"
                border={errors.email?.length && touched.email ? "red" : "white"}
              />
              {errors.email && touched.email ? (
                <StyledErrorMsg>{errors.email}</StyledErrorMsg>
              ) : null}
            </FormLabel>
            <Button type="submit" theme={ThemeButton.PRIMARY}>
              Sign Up
            </Button>
          </StyledForm>
        )}
      </Formik>
      <StyledSignInWrapper>
        <StyledText>Do you have an account?</StyledText>
        <StyledSignIn href="/login">Sign in</StyledSignIn>
      </StyledSignInWrapper>
    </StyledContainer>
=======
                errors={errors}
                touched={touched}
              >
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordConfirmationType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPasswordConfirmation()}
                />
              </FormikLabel>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                Sign up
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledText>Do you have an account?</StyledText>
          <StyledSignIn href="/login">Sign in</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
>>>>>>> dev
  )
}

Registration.getLayout = getLayout
