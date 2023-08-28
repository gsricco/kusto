import React from "react";
import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import { useRouter } from "next/router";
import { getLayout } from "common/components/Layout/BaseLayout/BaseLayout";
import { oauthRequest } from "features/auth/oauth2Request";
import {
  BlockButton,
  SigninWrapper,
  buttonStyle,
  spanStyle
} from "styles/styledComponents/auth/signin.styled";
import Image from "next/image";
import google from "public/img/icons/google-svgrepo-com.svg";
import github from "public/img/icons/github-svgrepo-com.svg";

export const getStaticProps = async () => {
  return {
    props: {
      providerParams: {
        google: {
          AUTH_URL: process.env.GOOGLE_AUTH_URL,
          SCOPE: process.env.GOOGLE_SCOPE,
          REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
          ID: process.env.GOOGLE_ID
        },
        github: {
          AUTH_URL: process.env.GITHUB_AUTH_URL,
          SCOPE: process.env.GITHUB_SCOPE,
          REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
          ID: process.env.GITHUB_ID
        }
      }
    }
  };
};

const Signin = (props: ProvidersPropsType) => {
  const route = useRouter();

  const handle = (provider: string) => {
    const url = oauthRequest(provider, props);
    console.log(url);
    window.location.assign(url);
  };

  return (
    <>
      <SigninWrapper>
        <BlockButton>
          <Button
            theme={ThemeButton.SECONDARY}
            type="button"
            width={"300"}
            style={buttonStyle}
            onClick={() => {
              handle("google");
            }}
          >
            <Image width={24} height={24} src={google} alt={"google"} />
            <span style={spanStyle}>Sign in with Google</span>
          </Button>

          <Button
            theme={ThemeButton.SECONDARY}
            type="button"
            width={"300"}
            style={buttonStyle}
            onClick={() => {
              handle("github");
            }}
          >
            <Image width={24} height={24} src={github} alt={"github"} />
            <span style={spanStyle}>Sign in with GitHub</span>
          </Button>
        </BlockButton>
      </SigninWrapper>
    </>
  );
};
Signin.getLayout = getLayout;
export default Signin;

export type ProviderData = {
  AUTH_URL: string;
  SCOPE: string;
  REDIRECT_URI: string;
  ID: string;
};

export type ProvidersPropsType = {
  providerParams: {
    google: ProviderData;
    github: ProviderData;
  };
};
