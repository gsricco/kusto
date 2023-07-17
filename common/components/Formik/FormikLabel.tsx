import { FormikField } from "./FormikField";
import React from "react";
import styled from "styled-components";
import { baseTheme } from "../../../styles/styledComponents/theme";
import { labelType } from "./types";

export const FormikLabel = ({
  title,
  name,
  border,
  id,
  errors,
  touched,
  type,
  value,
  onChange,
  children,
  width,
  errorShow,
  textAreaData,
  marginBottom
}: labelType) => {

  // if (name === "username")
  //   errors.username && touched.username ? (errorMessage = errors.username) : "";
  // if (name === "email") errors.email && touched.email ? (errorMessage = errors.email) : "";
  // if (name === "password")
  //   errors.password && touched.password ? (errorMessage = errors.password) : "";
  // if (name === "passwordConfirmation")
  //   errors.passwordConfirmation && touched.passwordConfirmation
  //     ? (errorMessage = errors.passwordConfirmation)
  //     : "";
  // if (name === "loginOrEmail")
  //   errors.loginOrEmail && touched.loginOrEmail ? (errorMessage = errors.loginOrEmail) : "";
  // if (name === "newPassword")
  //   errors.newPassword && touched.newPassword ? (errorMessage = errors.newPassword) : "";
  // if (name === "newPassword")
  //   errors.newPassword && touched.newPassword ? (errorMessage = errors.newPassword) : "";
  // if (name === "aboutMe") errors.aboutMe && touched.aboutMe ? (errorMessage = errors.aboutMe) : "";
  // if (name === "recoveryCode")
  //   errors.recoveryCode && touched.recoveryCode ? (errorMessage = errors.recoveryCode) : "";
  // if (name === "firstname")
  //   errors.firstname && touched.firstname ? (errorMessage = errors.firstname) : "";
  // if (name === "lastname")
  //   errors.lastname && touched.lastname ? (errorMessage = errors.lastname) : "";
  // if (name === "birthday")
  //   errors.birthday && touched.birthday ? (errorMessage = errors.birthday) : "";
  // if (name === "city") errors.city && touched.city ? (errorMessage = errors.city) : "";

  return (
    <StyledLabel id={id} withError={!!errors[name] && !!touched[name]} marginBottom={marginBottom}>
      <StyledTitle>
        <span>{title}</span>
      </StyledTitle>
      <StyledInputContainer>
        <FormikField
          name={name}
          border={border}
          type={type}
          value={value}
          onChange={(e) => onChange(e)}
          width={width}
          textAreaData={textAreaData}
        />

        {children}
      </StyledInputContainer>
      {!!errors[name] && touched[name] && (
        <StyledErrorMsg errorShow={errorShow}>{errors[name]}</StyledErrorMsg>
      )}
    </StyledLabel>
  );
};

const StyledInputContainer = styled.div`
  position: relative;
`;

const StyledLabel = styled.label<{ withError: boolean; marginBottom?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font-family: Inter;
  font-size: 16px;

  margin-bottom: ${(props) => (props.withError ? 0 : props.marginBottom || "24px")};
`;

type StyledErrorMsgPropsType = {
  errorShow?: boolean;
};

const StyledErrorMsg = styled.div<StyledErrorMsgPropsType>`
  width: 100%;
  font-family: Inter;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  line-height: 24px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  color: ${baseTheme.colors.danger["500"]};
`;

const StyledTitle = styled(StyledErrorMsg)`
  color: ${baseTheme.colors.light["900"]};

  & span::first-letter {
    text-transform: uppercase;
  }
`;
