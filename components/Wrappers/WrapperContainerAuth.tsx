import React, {FC, PropsWithChildren} from 'react';
import Image from "next/image";
import google from "../../public/icons/google-svgrepo-com.svg";
import github from "../../public/icons/github-svgrepo-com.svg";
import styled from "styled-components";
import {baseTheme} from "../../styles/styledComponents/theme";

export const WrapperContainerAuth: FC<PropsWithChildren&{title:string}>=  (props)=> {
  const {children, title} = props
  return (
    <StyledFormAuth>
      <StaledTitle>{title}</StaledTitle>
      <StyledIconBlock>
        <Image width={36} height={36} src={google} alt={'Kusto'}/>
        <Image width={36} height={36} src={github} alt={'it'}/>
      </StyledIconBlock>
      {children}
    </StyledFormAuth>
  )
}

const StyledFormAuth = styled.div<FormAuthPropsType>
  `
    max-width: ${props => props.width?props.width:'378px'};
    width: 100%;
    height: ${props => props.height?props.height:'auto'};
    padding: 20px;
    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    
    background: ${baseTheme.colors.dark["500"]};
    border: 1px solid ${baseTheme.colors.dark["300"]};

    @media (max-width: 390px){
      max-width: ${props => props.width?props.width:'90vw'};
    }
  `

const StaledTitle = styled.h1
  `
    width: 100%;
    text-align: center;
    margin: 0;

    font-size: 20px;
    font-family: Inter;
    font-weight: 700;
    line-height: 36px;
    
    color: ${baseTheme.colors.light["100"]};
  `
const StyledIconBlock = styled.div
  `
    max-width: 132px;
    width: 100%;
    margin: 10px 50px 20px 50px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `

type FormAuthPropsType = {
  width?: string
  height?: string
}