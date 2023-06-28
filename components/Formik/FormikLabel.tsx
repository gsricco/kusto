import {FormikField} from "./FormikField";
import React from "react";
import {FormikErrors, FormikTouched} from "formik";
import {useShowPassword} from "../../assets/hooks/useShowPassword";
import styled from "styled-components";
import {baseTheme} from "../../styles/styledComponents/theme";

type labelType = {
  children?: React.ReactNode
  id?: string
  type?: string
  title: string
  name?: string
  border?: string
  errors: FormikErrors<{
    username?: string;
    password?: string;
    passwordConfirmation?: string;
    email?: string;
    loginOrEmail?: string;
  }>
  touched: FormikTouched<{
    username?: string;
    password?: string;
    passwordConfirmation?: string;
    email?: string;
    loginOrEmail?: string;
  }>
  value: string
  onChange: (e: string) => void
}

export const FormikLabel = ({title, name, border, id, errors, touched, type, value, onChange}: labelType) => {

  let errorMessage = '';

  if (name === 'username') errors.username && touched.username ? errorMessage = errors.username : ''
  if (name === 'email') errors.email && touched.email ? errorMessage = errors.email : ''
  if (name === 'password') errors.password && touched.password ? errorMessage = errors.password : ''
  if (name === 'passwordConfirmation') errors.passwordConfirmation && touched.passwordConfirmation ? errorMessage = errors.passwordConfirmation : ''
  if (name === 'loginOrEmail') errors.loginOrEmail && touched.loginOrEmail ? errorMessage = errors.loginOrEmail : ''


  return (
    <>
      <StyledTitle><span>{title}</span></StyledTitle>
      <FormikField
        id={id}
        name={name}
        border={border}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
      />
      <StyledErrorMsg>{errorMessage}</StyledErrorMsg>
    </>
  )
}

const StyledErrorMsg = styled.div
  `
    width: 100%;
    height: 30px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${baseTheme.colors.danger["500"]};
  `;

const StyledTitle = styled(StyledErrorMsg)
  `
    color: ${baseTheme.colors.light["900"]};

    & span::first-letter {
      text-transform: uppercase;
    }
  `
