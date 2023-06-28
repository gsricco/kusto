import React from "react"
import {Formik} from "formik"
import showPasswordBtn from "../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg"
import {
  StyledErrorMsg,
  StyledForm,
  StyledShowPasswordBtn,
  StyledText
} from "styles/styles"
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout"
import {useShowPassword} from "assets/hooks/useShowPassword"
import {NewPasswordSchema} from "../../utils/validateNewPassword";
import FormikLabel from "../../components/Formik/FormikLabel";
import {FormikField} from "../../components/Formik/FormikField";
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth";
import {StyledContainerAuth} from "../login";
import {Button, ThemeButton} from "../../components/Button/ui/Button";
import { usePostNewPasswordMutation } from "assets/api/passwordRecoveryApi"

export default function NewPassword() {

    const [createNewPassword, result] = usePostNewPasswordMutation()
  const {passwordType, passwordConfirmationType, showPassword, showPasswordConfirmation} =
    useShowPassword()

    let recoveryCode = "gddj5"
  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={'Create New Password'}>
        <Formik
          initialValues={{
            newPassword: "",
            passwordConfirmation: "",
          }}
          validationSchema={NewPasswordSchema}
          onSubmit={async (values, {resetForm}) => {
            // const data = {
            //     newPassword: values.password,
            //     recoveryCode: recoveryCode
            // }

            try {
                console.log(values.newPassword, recoveryCode)
                debugger
                await createNewPassword(values.newPassword, recoveryCode)
                    .then(() => console.log("otpravleno"))
            //   await fetch("https://calypso-one.vercel.app/auth/new-password", {
            //     method: "POST",
            //     body: JSON.stringify(data),
            //     headers: {
            //       "Content-Type": "application/json"
            //     }
            //   }).then(() => console.log("otpravleno"))
              resetForm()
            } catch {
              console.log("err")
            }
          }}
        >
          {({errors, touched}) => (
            <StyledForm>
              <FormikLabel id="pass">
                New Password
                <FormikField
                  name="newPassword"
                  type={passwordType}
                  border={errors.newPassword?.length && touched.newPassword ? "red" : "white"}
                />
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPassword()}
                />
                {errors.newPassword && touched.newPassword ? (
                  <StyledErrorMsg>{errors.newPassword}</StyledErrorMsg>
                ) : null}
              </FormikLabel>
              <FormikLabel id="pass">
                Password confirmation
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordConfirmationType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPasswordConfirmation()}
                />
                <FormikField
                  name="passwordConfirmation"
                  type={passwordConfirmationType}
                  border={
                    errors.passwordConfirmation?.length && touched.passwordConfirmation
                      ? "red"
                      : "white"
                  }
                />
                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                  <StyledErrorMsg>{errors.passwordConfirmation}</StyledErrorMsg>
                ) : null}
              </FormikLabel>
              <StyledText>Your password must be between 6 and 20 characters</StyledText>
              <Button theme={ThemeButton.PRIMARY} type="submit">Create new password</Button>
            </StyledForm>
          )}
        </Formik>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

NewPassword.getLayout = getLayout