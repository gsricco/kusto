import React from "react"
import {Formik} from "formik"
import showPasswordBtn from "../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg"
import {StyledForm, StyledSignIn, StyledSignInWrapper, StyledText} from "styles/styles"
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout"
import {useShowPassword} from "assets/hooks/useShowPassword"
import {SignupSchema} from "../../utils/validateRegistraition";
import AuthIcons from "../../components/Wrappers/Auth/AuthIcons";
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth";
import {StyledContainerAuth} from "../login";
import {Button, ThemeButton} from "../../components/Button/ui/Button";
import {FormikLabel} from "../../components/Formik/FormikLabel";
import styled from "styled-components";
import Image from "next/image";

export default function Registration() {
  const {passwordType, passwordConfirmationType, showPassword, showPasswordConfirmation} =
    useShowPassword()

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={'Sing In'}>
        <AuthIcons/>
        <Formik
          initialValues={{
            username: "",
            password: "",
            passwordConfirmation: "",
            email: "",
            loginOrEmail:''
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, {resetForm}) => {
            console.log('values', values.username)
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
          {({errors, touched, values, setFieldValue}) => (
            <StyledForm>
              <FormikLabel name="username" onChange={(e) => setFieldValue('username', e)} value={values.username}
                           type={'text'} title={'Username'}
                           border={errors.username?.length && touched.username ? "red" : "white"} errors={errors}
                           touched={touched}/>
              <FormikLabel name="email" onChange={(e) => setFieldValue('email', e)} value={values.email}
                           type={'email'} title={'email'}
                           border={errors.email?.length && touched.email ? "red" : "white"} errors={errors}
                           touched={touched}/>
              <FormikLabel id="pass" name="password" onChange={(e) => setFieldValue('password', e)}
                           value={values.password} type={passwordType} title={'Password'}
                           border={errors.password?.length && touched.password ? "red" : "white"} errors={errors}
                           touched={touched} />
              <StyledShowPasswordBtn
                alt="show password"
                src={passwordType === "password" ? showPasswordBtn : hidePasswordBtn}
                onClick={() => showPassword()}
              />
              <FormikLabel id="pass" name="passwordConfirmation"
                           onChange={(e) => setFieldValue('passwordConfirmation', e)}
                           value={values.passwordConfirmation}
                           type={passwordConfirmationType} title={'passwordConfirmationType'}
                           border={errors.passwordConfirmation?.length && touched.passwordConfirmation ? "red" : "white"}
                           errors={errors}
                           touched={touched}/>
              <StyledShowPasswordBtn
                alt="show password"
                src={passwordConfirmationType === "password" ? showPasswordBtn : hidePasswordBtn}
                onClick={() => showPasswordConfirmation()}
              />
              <Button theme={ThemeButton.PRIMARY} type="submit">Sign Up</Button>
            </StyledForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledText>Don’t have an account?</StyledText>
          <StyledSignIn href="/login">Sign up</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

Registration.getLayout = getLayout


const StyledShowPasswordBtn = styled(Image)`
  position: relative;
  bottom: 60px;
  left: 140px;
`;