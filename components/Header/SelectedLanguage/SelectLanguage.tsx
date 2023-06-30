import {baseTheme} from "../../../styles/styledComponents/theme";
import styled from "styled-components";
import { useTranslation } from 'next-i18next'
import { i18n } from 'next-i18next.config.js'

export const SelectLanguage = () => {

  const { i18n } = useTranslation();

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    i18n.changeLanguage(e.target.value);
  }

  return (
    <StyledSelectLanguage onChange={handleLangChange}>
      <option value="russian">&#127479;&#127482; Russian</option>
      <option value="english">&#127468;&#127463; English</option>
    </StyledSelectLanguage>
  );
};

const StyledSelectLanguage = styled.select
  `
    width: 163px;
    height: 36px;
    margin-left: 3.7%;

    background: ${baseTheme.colors.dark[700]};
    outline: none;

    color: white;
  `
