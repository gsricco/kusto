import React from "react";
import Image from "next/image";
import google from "../../public/img/icons/google-svgrepo-com.svg";
import github from "../../public/img/icons/github-svgrepo-com.svg";
import styled from "styled-components";
import { baseTheme } from "../../styles/styledComponents/theme";
import { getSession, signIn } from "next-auth/react";

const AuthIcons = () => {
  // const handleLoginClick = () => {

  //   const auth2 = gapi.auth
  //   auth2.signIn().then(user => {
  //   auth2.authorize()
  //   .then((res) => {
  //   console.log(res);
  //   signup(user); // sending code and profile to backend .
  //   });
  //   });
  //   };

  return (
    <StyledIconBlock>
      <Link
        href={`/api/auth/signin`}
        onClick={(e) => {
          e.preventDefault();
          signIn();
          // .then(async (res) => {
          //   const session = await getSession
          //   console.log(session)
          // });
        }}
      >
        <Image width={36} height={36} src={google} alt={"google"} />
        <Image width={36} height={36} src={github} alt={"github"} />
      </Link>

      <Message>SignIn with Google or Github</Message>
    </StyledIconBlock>
  );
};

export default AuthIcons;

const StyledIconBlock = styled.div`
  position: relative;
  max-width: 132px;
  width: 100%;
  margin: 10px 50px 20px 50px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 60px;

  &:hover div {
    display: block;
    text-align: center;
  }
`;

const Link = styled.a`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Message = styled.div`
  position: absolute;
  top: -90px;
  left: 16px;
  display: none;
  color: ${baseTheme.colors.warning[100]};
  background: ${baseTheme.colors.dark[300]};
  opacity: 0.9;
  padding: 10px;
  border-radius: 2px;
  font-family: Inter;
`;
