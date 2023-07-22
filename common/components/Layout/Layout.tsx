import Header from "../Header/Header";
import { NextPage } from "next";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { baseTheme } from "../../../styles/styledComponents/theme";
import { Providers } from "../Navigation/Providers";

export const Layout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <Providers>
      <StyledWrapper>
        <Header />
        <Main>{children}</Main>
      </StyledWrapper>
    </Providers>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${baseTheme.colors.dark["700"]};
  color: ${baseTheme.colors.light[100]};
`;

const Main = styled.div``;
