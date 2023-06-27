import React, {useState} from "react";
import {Formik} from "formik";
import showPasswordBtn from "../../public/icons/eye-outline.svg";
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg";
import {SignupSchema} from "../../utils/validateRegistraition";
import {
  StyledErrorMsg,
  StyledField,
  StyledForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText,
} from "styles/styles";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {StyledContainerAuth} from "../login";
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth";
import AuthIcons from "../../components/Wrappers/Auth/AuthIcons";
import {Button, ThemeButton} from "../../components/Button/ui/Button";


const Registration = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmationType, setPasswordConfirmationType] =
    useState("password");

  const showPasswordHandler = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };
  const showPasswordConfirmationHandler = () => {
    if (passwordConfirmationType === "text") {
      setPasswordConfirmationType("password");
    } else {
      setPasswordConfirmationType("text");
    }
  };

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={'Sing up'}>
        <AuthIcons/>
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordConfirmation: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          const data = {
            email: values.email,
            password: values.password,
            username: values.username,
          };

          try {
            await fetch("https://jsonplaceholder.typicode.com/users", {
              method: "POST",
              body: JSON.stringify(data),
            }).then(() => console.log("otpravleno"));
            resetForm();
          } catch {
            console.log("err");
          }
        }}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <label>
              Username
              <StyledField
                name="username"
                // border={errors.username?.length ? "red" : "white"}
              />
              {errors.username && touched.username ? (
                <StyledErrorMsg>{errors.username}</StyledErrorMsg>
              ) : null}
            </label>
            <label id="pass">
              Password
              <StyledField name="password" type={passwordType} />
              <StyledShowPasswordBtn
                alt="show password"
                src={
                  passwordType === "password"
                    ? showPasswordBtn
                    : hidePasswordBtn
                }
                onClick={() => showPasswordHandler()}
              />
              {errors.password && touched.password ? (
                <StyledErrorMsg>{errors.password}</StyledErrorMsg>
              ) : null}
            </label>
            <label id="pass">
              Password confirmation
              <StyledShowPasswordBtn
                alt="show password"
                src={
                  passwordConfirmationType === "password"
                    ? showPasswordBtn
                    : hidePasswordBtn
                }
                onClick={() => showPasswordConfirmationHandler()}
              />
              <StyledField
                name="passwordConfirmation"
                type={passwordConfirmationType}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <StyledErrorMsg>{errors.passwordConfirmation}</StyledErrorMsg>
              ) : null}
            </label>
            <label>
              Email
              <StyledField name="email" type="email" />
              {errors.email && touched.email ? (
                <StyledErrorMsg>{errors.email}</StyledErrorMsg>
              ) : null}
            </label>
            <Button theme={ThemeButton.PRIMARY} type={'submit'}>Sing up</Button>
          </StyledForm>
        )}
      </Formik>
      <StyledSignInWrapper>
        <StyledText>Do you have an account?</StyledText>
        <StyledSignIn href="/login">Sign in</StyledSignIn>
      </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  );
}

Registration.getLayout = getLayout

export default Registration