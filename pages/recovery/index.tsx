import React, { useState } from "react"
import {Formik} from "formik"
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout"
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth"
import {Button, ThemeButton} from "../../components/Button/Button"
import {FormikLabel} from "../../components/Formik/FormikLabel"
import {
  StyledAuthForm,
  StyledContainerAuth,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "../../styles/styledComponents/auth/FormikAuth.styled"
import {useSendRecoveryLinkMutation} from "../../store/api/auth/authApi"
import {FormValueRecovery, ResetForm} from "../../components/Formik/types"
import {validateRecovery} from "../../utils/validateRecovery";
import { EmailSentModal } from "components/PopUpModal/EmailSentModal"

export default function Registration() {

  const initialAuthValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    loginOrEmail: ""
  }

  const [isMessageSent, setIsMessageSent] = useState(false)
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [recoveryHandler, result] = useSendRecoveryLinkMutation()


  const handleSubmit = async (values: FormValueRecovery, {resetForm}: ResetForm) => {
    const data = {
      email: values.email,
    }
    try {
      await recoveryHandler(data).then(() => console.log(result))
      setIsModalOpen(true)
      resetForm()
      setEmail(values.email)
      setIsMessageSent(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={"Forgot Password"}>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateRecovery}
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
                name="email"
                onChange={(e) => setFieldValue("email", e)}
                value={values.email}
                type={"email"}
                title={"email"}
                border={errors.email?.length && touched.email ? "red" : "white"}
                errors={errors}
                touched={touched}
              />
              <StyledSignInWrapper>
                <StyledText>Enter your email address and we will send you further instructions
                </StyledText>
                {isMessageSent && (
                  <StyledText>We have sent a link to confirm your email to {email}</StyledText>
                )}
              </StyledSignInWrapper>
              
              <Button theme={ThemeButton.PRIMARY} type="submit">
                {isMessageSent ? "Send Link Again" : "Send Link"}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledSignIn href="/login">Back to Sign in</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
      {isModalOpen && (
        <EmailSentModal
          title="Email Sent"
          bodyText={`We have sent a link to confirm your email to ${email}`}
          handleModalClose={handleModalClose}
        ></EmailSentModal>
      )}
    </StyledContainerAuth>
  )
}

Registration.getLayout = getLayout
