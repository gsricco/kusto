import styled from "styled-components";
import { baseTheme } from "../../../styles/styledComponents/theme";
import { NavbarPropsType } from "./Navbar";

//Navbar
export const StyledSidebar = styled.div<NavbarPropsType>`
  position: relative;
  max-width: 220px;
  min-width: 160px;
  height: 660px;
  width: 17vw;
  opacity: ${(props) => (props.showNavbar ? 0 : 1)};

  border-right: 1px solid ${baseTheme.colors.dark[300]};
`;

export const StyledItemBlock = styled.div`
  margin-left: 45px;
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;

  > * {
    &:last-child {
      margin-top: 84px;
    }
  }

  @media (max-width: 940px) {
    margin-left: 20px;
  }
`;

export const StyledLogout = styled.div`
  position: absolute;
  bottom: 36px;
  left: 45px;

  @media (max-width: 940px) {
    left: 20px;
  }
`;

//MainLink
export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => (props.isActive ? 700 : 500)};
  line-height: 24px;
  color: ${(props) =>
    props.isActive ? baseTheme.colors.accent[500] : baseTheme.colors.light[100]};
`;
