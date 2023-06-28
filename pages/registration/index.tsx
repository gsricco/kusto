import React from "react"
import { Form, Formik, FormikState } from "formik"
import showPasswordBtn from "../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg"
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout"
import { useShowPassword } from "assets/hooks/useShowPassword"
import { SignupSchema } from "../../utils/validateRegistraition"
import AuthIcons from "../../components/Wrappers/Auth/AuthIcons"
import { WrapperContainerAuth } from "../../components/Wrappers/Auth/WrapperContainerAuth"
import { Button, ThemeButton } from "../../components/Button/ui/Button"
import { FormikLabel } from "../../components/Formik/FormikLabel"
import styled from "styled-components"
import Image from "next/image"
import { StyledContainerAuth } from "../../styles/styledComponents/auth/ContainerAuth.styled"
import { baseTheme } from "../../styles/styledComponents/theme"
import Link from "next/link"
import { useRegistrationMutation } from "store/api/auth/authApi"
import { FormValue, ResetForm } from "components/Formik/types"

export default function Registration() {
  const { passwordType, passwordConfirmationType, showPassword, showPasswordConfirmation } =
    useShowPassword()

  const [userRegistrationHandler] = useRegistrationMutation()

  const handleSubmit = async (values: FormValue, { resetForm }: ResetForm) => {
    const data = {
      email: values.email,
      password: values.password,
      login: values.username
    }
    try {
      await userRegistrationHandler(data)
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={"Sing In"}>
        <AuthIcons />
        <Formik
          initialValues={{
            username: "",
            password: "",
            passwordConfirmation: "",
            email: "",
            loginOrEmail: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <StyledForm>
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
                name="passwordConfirmation"
                onChange={(e) => setFieldValue("passwordConfirmation", e)}
                value={values.passwordConfirmation}
                type={passwordConfirmationType}
                title={"Password confirmation"}
                border={
                  errors.passwordConfirmation?.length && touched.passwordConfirmation
                    ? "red"
                    : "white"
                }
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
            </StyledForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledText>Don’t have an account?</StyledText>
          <StyledSignIn href="/login">Sign in</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

Registration.getLayout = getLayout

const StyledShowPasswordBtn = styled(Image)`
  position: absolute;
  top: 35px;
  right: 10px;
`

const StyledForm = styled(Form)`
  color: #8d9094;

  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    max-width: 330px;
    width: 100%;
    height: 100px;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    font-size: 16px;
  }

  #pass {
    position: relative;
  }
  @media (max-width: 390px) {
    width: 80vw;
  }
`

const StyledSignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 20px 0;
  justify-content: center;
  align-items: center;
`
const StyledText = styled.p`
  color: ${baseTheme.colors.light[100]};
  line-height: 24px;
`

const StyledSignIn = styled(Link)`
  text-decoration: none;
  color: ${baseTheme.colors.accent[500]};
  font-weight: 600;
`
