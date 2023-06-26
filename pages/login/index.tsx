import React from 'react';
import styled from "styled-components";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import google from '../../public/icons/google-svgrepo-com.svg'
import github from '../../public/icons/github-svgrepo-com.svg'
import Image from "next/image";
import {Button, ThemeButton} from "../../components/Button/ui/Button";
import {Input} from "../../components/Input/Input";
import {baseTheme} from "../../styles/styledComponents/theme";


const Login = () => {

  return (
    <StyledFormAuth width={'378px'} height={'516px'} >
      <Title>Sing In</Title>
      <StyledIconBlock>
        <Image width={36} height={36} src={google} alt={'Kusto'}/>
        <Image  width={36} height={36} src={github} alt={'it'}/>
      </StyledIconBlock>
      <Input/>
      <div>
        <Button theme={ThemeButton.PRIMARY}>Log In</Button>
      </div>
    </StyledFormAuth>
  );
};

Login.getLayout = getLayout
export default Login;

type FormAuthPropsType = {
  width: string
  height: string
}

const StyledFormAuth = styled.div<FormAuthPropsType>
  `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    //align-items: flex-start;
    width: ${props => props.width};
    height: ${props => props.height};
    background: ${baseTheme.colors.dark["500"]};
    border: 1px solid ${baseTheme.colors.dark["300"]};
    padding: 20px;
  `

const Title = styled.h1
`
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
  color:${baseTheme.colors.light["100"]};
  margin: 0;
`
const StyledIconBlock = styled.div
`
  max-width: 132px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 50px 20px 50px;
`





